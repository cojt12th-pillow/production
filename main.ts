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
}
function stopAlerm () {
  basic.showIcon(IconNames.Happy)
}

serial.writeString('Pillow: start')
