let todayAlermFinished = false
// e.g. 12:00 on Mon / Tue / Wed
let hour = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM1);
let minute = EEPROM.getAnyEEP(EEPROM.DS1307_REG_RAM2);
let weekdays = EEPROM.getDayEEP();

serial.writeLine(`INIT: ${hour}:${minute} in (${weekdays.join(',')})`)

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
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

function getAlermInfo() {
  serial.writeLine('get alerm info')
  const currentHour = DS1307.getHour();
  const currentMin = DS1307.getMinute();

  serial.writeLine(`now: ${currentHour}:${currentMin}`)

  // 設定した曜日の0時0分になったらリセット
  const weekday = DS1307.getWeekday().toString();
  if (currentHour === 0 && currentMin === 0 && weekdays.slice(2).some(w => w === weekday)) {
    todayAlermFinished = false
  }

  if (todayAlermFinished) {
    return
  }

  // 曜日と時刻が該当したらアラームを起動
  if (hour === currentHour && minute === currentMin) {
    todayAlermFinished = true
    // startAlermActivity()
  }
}

function setAlermTime(value: string) {
  const values = value.split(',');

  hour = parseInt(values[0]);
  minute = parseInt(values[1]);
  weekdays = values.slice(2);

  EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM1, hour);
  EEPROM.setAnyEEP(EEPROM.DS1307_REG_RAM2, minute);
  EEPROM.setDayEEP(weekdays);

  serial.writeLine(`data setted: [${values.join(', ')}]`)
}

function setRTCDate(value: string) {
  const values = value.split(',').map(v => parseInt(v));

  // DS1307.DateTime(date.getUTCFullYear(), date.getMonth(), date.getUTCDate(), date.getDay(), date.getHours(), date.getMinutes(), date.getUTCSeconds());
  DS1307.DateTime(values[0], values[1], values[2], values[3], values[4], values[5], values[6]);
}
