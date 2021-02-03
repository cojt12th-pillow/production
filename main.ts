bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
  const data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)).split(':');
  const key = data[0];
  const value = data[1];

  serial.writeLine(`bluetooth data received ${key}: ${value}`)
  switch (key) {
    case 'RUN_ALERM':
      startAlermActivity();
      break;
    case 'STOP':
      pins.digitalWritePin(DigitalPin.P11, 0)
      pins.digitalWritePin(DigitalPin.P12, 1)
      break;
    case 'ALERM':
      setAlermTime(value);
      break;
    case 'D':
      setRTCDate(value);
      break;
    default:
      break;
  }
})

pins.digitalWritePin(DigitalPin.P11, 0)
pins.digitalWritePin(DigitalPin.P12, 1)

input.onButtonPressed(Button.A, function () {
  basic.showString('A')
  startAlermActivity()
})

input.onButtonPressed(Button.B, function () {
  basic.showString('B')
  pins.digitalWritePin(DigitalPin.P11, 1)
  pins.digitalWritePin(DigitalPin.P12, 0)
})

bluetooth.startUartService()
bluetooth.onBluetoothConnected(() => serial.writeLine('connected'))
serial.redirect(SerialPin.P8, SerialPin.P0, BaudRate.BaudRate9600)
setVolume(30)
stopVoice()

basic.forever(() => {
  // 5秒ごとにアラームチェック
  basic.pause(5 * 1000)
  // getAlermInfo()
})
