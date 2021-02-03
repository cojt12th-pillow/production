let todayAlermFinished = false

// e.g. 12:00 on Mon / Tue / Wed
let hour = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM1);
let minute = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM2);
let weekdays = EEPROM.getDayEEP();

serial.writeLine(`INIT: ${hour}:${minute} in (${weekdays.join(',')})`)

// DS1307.stop()
// basic.pause(600)
// DS1307.stop()
// basic.pause(600)
// DS1307.stop()
// basic.pause(600)
// DS1307.start()

// const activityFunctions: (() => void)[] = [shakeActivityX, shakeActivityY, shakeActivityZ]

// alerms
function startAlermActivity () {
  pins.digitalWritePin(DigitalPin.P11, 1)
  pins.digitalWritePin(DigitalPin.P12, 0)

  serial.writeLine('START ALERM!!')
  // アクティビティをランダムに選択
  playVoice(trackCategory.start)

  // 再生時間だけ待機
  basic.pause(10 * 1000)

  // const number = getRandomInt(4)
  shakeActivityY();

  // アラームを止める
  stopAlerm()

  pins.digitalWritePin(DigitalPin.P11, 0)
  pins.digitalWritePin(DigitalPin.P12, 1)

  playVoice(trackCategory.finish)
}

function stopAlerm () {
  basic.showIcon(IconNames.Yes)
  stopVoice()
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

function getAlermInfo() {
  serial.writeLine('get alerm info')
  const currentHour = DS1307.getHour();
  const currentMin = DS1307.getMinute();

  serial.writeLine(`now: ${currentHour}:${currentMin}`)

  // 設定した曜日の0時0分になったらリセット
  const weekday = DS1307.getWeekday().toString();
  if (currentHour === 0 && currentMin === 0 && weekdays.slice(2).some(w => w === weekday)) {
    todayAlermFinished = false
  }

  if (todayAlermFinished) {
    return
  }

  // 曜日と時刻が該当したらアラームを起動
  if (hour === currentHour && minute === currentMin) {
    serial.writeLine('WAKE UP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    todayAlermFinished = true
    // startAlermActivity()
  }
}

function setAlermTime(value: string) {
  const values = value.split(',');

  hour = parseInt(values[0]);
  minute = parseInt(values[1]);
  weekdays = values[2].split('');

  EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM1, hour);
  basic.pause(5);
  EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM2, minute);
  basic.pause(5);
  EEPROM.setDayEEP(weekdays);
  basic.pause(5);

  serial.writeLine(`data setted: [${values.join(', ')}]`)
}

function setRTCDate(value: string) {
  const values = value.split(',').map(v => parseInt(v));

  DS1307.setYear(2021)
  basic.pause(5);
  DS1307.setMonth(values[0])
  basic.pause(5);
  DS1307.setDay(values[1])
  basic.pause(5);
  DS1307.setWeekday(values[2])
  basic.pause(5);
  DS1307.setHour(values[3])
  basic.pause(5);
  DS1307.setMinute(values[4])
  basic.pause(5);
  DS1307.setSecond(values[5])
  basic.pause(5);
}
