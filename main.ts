// events
input.onButtonPressed(Button.A, function () {
  startAlermActivity()
})

// alerms
function startAlermActivity () {
  // 音を鳴らしたりする
  runAlerm()
  // アクティビティをランダムに選択
  const activity = getRandomActivity()
  activity()
  // アラームを止める
  stopAlerm()
}
function runAlerm () {
  basic.showIcon(IconNames.Angry)
  setLoopMode(1)
  playVoice(1)
}
function stopAlerm () {
  basic.showIcon(IconNames.Yes)
  stopVoice()
}

serial.redirect(SerialPin.P1, SerialPin.P0, BaudRate.BaudRate9600)
setVolume(15)
stopVoice()

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
  const uartValue = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
  if (uartValue == 'alerm') {
    startAlermActivity()
  }
})

bluetooth.startUartService()