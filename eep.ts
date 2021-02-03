namespace EEPROM {
    let DS1307_I2C_ADDR = 104;
    let DS1307_REG_SECOND = 0
    let DS1307_REG_MINUTE = 1
    let DS1307_REG_HOUR = 2
    let DS1307_REG_WEEKDAY = 3
    let DS1307_REG_DAY = 4
    let DS1307_REG_MONTH = 5
    let DS1307_REG_YEAR = 6
    let DS1307_REG_CTRL = 7
    export let DS1307_REG_RAM1 = 18
    export let DS1307_REG_RAM2 = 19
    export let DS1307_REG_RAM3 = 20
    export let DS1307_REG_RAM4 = 21
    export let DS1307_REG_RAM5 = 22
    export let DS1307_REG_RAM6 = 23
    export let DS1307_REG_RAM7 = 24
    export let DS1307_REG_RAM8 = 25


    function setReg(reg: number, dat: number): void {
    let buf = pins.createBuffer(2);
    buf[0] = reg;
    buf[1] = dat;
    pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf);
    }

    function getReg(reg: number): number {
    pins.i2cWriteNumber(DS1307_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(DS1307_I2C_ADDR, NumberFormat.UInt8BE);
    }

    function HexToDec(dat: number): number {
    return (dat >> 4) * 10 + (dat % 16);
    }

    function DecToHex(dat: number): number {
    return Math.idiv(dat, 10) * 16 + (dat % 10)
    }

    export function setEEPRom(data: number): void{
    setReg(DS1307_REG_RAM1, DecToHex(data % 100))
    }

    export function getEEPROM(): number{
    return HexToDec(getReg(DS1307_REG_RAM1))
    }

    export function setAnyEEP(reg:number,data:number):void{
    setReg(reg, DecToHex(data % 100))
    }

    export function getAnyEEP(reg:number): number{
    return HexToDec(getReg(reg))
    }

    //Day encoding implements
    //7桁の二進数を考える
    //7桁目から右側にかけて，日月火水木金土とする
    //1がアラームオン，0がオフ
    //1000000は日曜のみ
    //1000001は土日
    //0101010は月水金を示している．

    //累乗 testOK
    function power(data:number,index:number):number{
        let result =1
        for(let i=0;i<index;i++){
             result = result * data;
        }
        return result;
    }

    function binToDec(data:string[]):number{
        let length = data.length;
        let sum=0;
        //debug
        // serial.writeLine("Length:"+length)
        for(let i=0;i<length;i++){
            let tmp:number;
            if(data[i]=="1"){
                tmp=1
            }else if(data[i].compare("")){
                tmp=0
            }
            //debug
            // let iii = tmp*power(2,i);
            // serial.writeLine("roop:"+i+" tmp:"+tmp+" power:"+iii)
            sum += tmp*power(2,i)
        }
        //debug
        // serial.writeLine("sum:"+sum)
        return sum;
    }

    export function setDayEEP(data:string[]):void{
        data.reverse();
        let value1 :number = binToDec(data)
        let value2 :number=0;
        //debug
        serial.writeLine("val1:"+value1+" :val2:"+value2);
        if(value1>=99){
            value2=value1-99;
            value1=99;
        }
        //debug
        serial.writeLine("val1:"+value1+" :val2:"+value2);
    setAnyEEP(DS1307_REG_RAM3,value1);
    setAnyEEP(DS1307_REG_RAM4,value2);
    }
    export function decToBin(data:number):string[]{
        let arr :string[] = ["0","0","0","0","0","0","0"];
        let index=0;
        while(data>0){
            //debug
            serial.writeNumber(data);
            serial.writeLine("...nextLine")
            if(data%2==0){
                arr[index]="0";
            }else{
                arr[index]="1";
            }
            data=Math.floor(data/2);
            index++;
        }
        arr.reverse();
        return arr;
    }
    
    export function getDayEEP():string[]{
        let value1:number=EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM3);
        let value2:number=EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM4);
        value1=value1+value2;
        return decToBin(value1);
    }
}