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

function setAlermTime(value: string) {
  const [hours, minutes, ...weekdays] = value.split(',').map(v => parseInt(v));

  // TODO: set alerm time
}

function setRTCDate(value: string) {
  const date = new Date(value);

  DS1307.DateTime(date.getUTCFullYear(), date.getMonth(), date.getUTCDate(), date.getDay(), date.getHours(), date.getMinutes(), date.getUTCSeconds());
}
