bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
  const data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)).split(':');
  const key = data[0];
  const value = data[1];

  serial.writeLine(`bluetooth data received ${key}: ${value}`)
  switch (key) {
    // case 'RUN_ALERM':
    //   startAlermActivity();
    //   break;
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

input.onButtonPressed(Button.A, function () {
  startAlermActivity()
})

input.onButtonPressed(Button.B, function () {
  playVoice(1)
})

bluetooth.startUartService()
bluetooth.onBluetoothConnected(() => serial.writeLine('connected'))
// serial.redirect(SerialPin.P1, SerialPin.P0, BaudRate.BaudRate9600)
// setVolume(15)

// stopVoice()

// basic.forever(() => {
//   // getAlermInfo()

//   // 10秒ごとにアラームチェック
//   basic.pause(10 * 1000)
// })
