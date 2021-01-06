// events
input.onButtonPressed(Button.A, function () {
  startAlermActivity()
})

serial.redirect(SerialPin.P1, SerialPin.P0, BaudRate.BaudRate9600)
setVolume(15)
stopVoice()

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
  const [key, value] = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)).split(':', 1);

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

bluetooth.startUartService()