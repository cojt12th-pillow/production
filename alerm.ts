let todayAlermFinished = false

// alerms
function startAlermActivity () {
  // 音を鳴らしたりする
  runAlerm()

  // TODO: ユーザが起きたことを確認してからアクティビティを始める

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
  todayAlermFinished = true
}

function getAlermInfo() {
  const currentInfo = [DS1307.getHour(), DS1307.getMinute(), DS1307.getWeekday()];
  // e.g. 12:00 on Mon / Tue / Wed
  const settings = [12, 0, 1, 2, 3]

  // 0時0分にリセット
  if (currentInfo[0] === 0 && currentInfo[0] === 0) {
    todayAlermFinished = false
  }

  if (todayAlermFinished) {
    return
  }

  // 曜日と時刻が該当したらアラームを起動
  if (settings.slice(2).includes(currentInfo[2])) {
    if (settings[0] === currentInfo[0] && settings[1] === currentInfo[1]) {
      startAlermActivity()
    }
  }
}

function setAlermTime(value: string) {
  const [hours, minutes, ...weekdays] = value.split(',').map(v => parseInt(v));

  // TODO: set alerm time
}

function setRTCDate(value: string) {
  const date = new Date(value);

  DS1307.DateTime(date.getUTCFullYear(), date.getMonth(), date.getUTCDate(), date.getDay(), date.getHours(), date.getMinutes(), date.getUTCSeconds());
}
