const UUID_UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
const UUID_TX_CHAR_CHARACTERISTIC = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
const UUID_RX_CHAR_CHARACTERISTIC = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'

let gatt = null
let tx = null
let rx = null

const update = connected => {
    document.getElementById('connect').textContent = connected ? '切断' : '接続'
    document.getElementById('send').disabled = !connected
}
const send = text => rx.writeValue(new TextEncoder().encode(text + '\n'))

document.getElementById('connect').addEventListener('click', e => {
    if(!(navigator.bluetooth && navigator.bluetooth.requestDevice)) {
        alert('WebBluetooth に未対応のブラウザです。')
        return
    }
    if (document.getElementById('connect').textContent == '接続') {
        navigator.bluetooth.requestDevice({
            filters: [
                { services: [UUID_UART_SERVICE] },
                { namePrefix: 'BBC micro:bit' }
            ]
        }).then(device => {
            gatt = device.gatt
            return gatt.connect()
        }).then(server =>
            server.getPrimaryService(UUID_UART_SERVICE)
        ).then(service =>
            Promise.all([
            service.getCharacteristic(UUID_TX_CHAR_CHARACTERISTIC),
            service.getCharacteristic(UUID_RX_CHAR_CHARACTERISTIC)])
        ).then(characteristics => {
            tx = characteristics[0]
            tx.startNotifications()
            tx.addEventListener('characteristicvaluechanged', e => {
                const text = new TextDecoder().decode(e.target.value)
                document.getElementById('recieve_text').value = text + document.getElementById('recieve_text').value
            })
            rx = characteristics[1]
            update(true)
        }).catch(function(err) {
            alert(err)
        })
    } else {
        gatt.disconnect()
        update(false)
    }
})
document.getElementById('send').addEventListener('click', e => {
    send(document.getElementById('send_text').value)
})