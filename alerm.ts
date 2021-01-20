let todayAlermFinished = false
// e.g. 12:00 on Mon / Tue / Wed
const hour = 12
const minute = 0
const weekdays = [1, 2, 3]

const activityFunctions: (() => void)[] = [shakeActivityX, shakeActivityY, shakeActivityZ]

// alerms
function startAlermActivity () {
  // アクティビティをランダムに選択
  setLoopMode(1)
  playVoice(trackCategory.start)

  // 再生時間だけ待機

  const number = getRandomInt(3)
  activityFunctions[number]();

  // アラームを止める
  stopAlerm()

  playVoice(trackCategory.finish)
}

function stopAlerm () {
  basic.showIcon(IconNames.Yes)
  stopVoice()
  todayAlermFinished = true
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

function getAlermInfo() {
  const [currentHour, currentMin] = [DS1307.getHour(), DS1307.getMinute()];

  // 設定した曜日の0時0分になったらリセット
  if (currentHour === 0 && currentMin === 0 && weekdays.slice(2).includes(DS1307.getWeekday())) {
    todayAlermFinished = false
  }

  if (todayAlermFinished) {
    return
  }

  // 曜日と時刻が該当したらアラームを起動
  if (hour === currentHour && minute === currentMin) {
    startAlermActivity()
  }
}

function setAlermTime(value: string) {
  const [configHour, ConfigMinute, ...configWeekdays] = value.split(',').map(v => parseInt(v));

  // TODO: set alerm time
}

function setRTCDate(value: string) {
  const date = new Date(value);

  DS1307.DateTime(date.getUTCFullYear(), date.getMonth(), date.getUTCDate(), date.getDay(), date.getHours(), date.getMinutes(), date.getUTCSeconds());
}
