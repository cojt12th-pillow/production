input.onButtonPressed(Button.A, function () {
  startAlermActivity()
})

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
  const [key, value] = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)).split(':', 1);

  serial.writeLine(`bluetooth data received: { ${key}: ${value} }`)
  switch (key) {
    case 'RUN_ALERM':
      startAlermActivity();
      break;
    case 'SET_ALERM':
      setAlermTime(value);
      break;
    case 'SET_DATE':
      setRTCDate(value);
      break;
    default:
      break;
  }
})

input.onButtonPressed(Button.A, function () {
  // startAlermActivity()
  getAlermInfo()
})

input.onButtonPressed(Button.B, function () {
  playVoice(1)
})

// bluetooth.startUartService()
// serial.redirect(SerialPin.P1, SerialPin.P0, BaudRate.BaudRate9600)
// setVolume(15)

// stopVoice()

serial.writeLine('forever');
basic.forever(() => {
  serial.writeLine('hoge')
  // getAlermInfo()

  // 10秒ごとにアラームチェック
  basic.pause(10 * 1000)
})
