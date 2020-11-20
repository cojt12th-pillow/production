const TIMES_LIMIT = 10
let continuesAlerm = false
let activitySuccessCount = 0
const activityFunctions = [shakeActivityX, shakeActivityY, shakeActivityZ]

// utils
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

// events
input.onButtonPressed(Button.A, function () {
  startAlermActivity()
})

// alerms
function startAlermActivity () {
  continuesAlerm = true
  // 音を鳴らしたりする
  runAlerm()
  // アクティビティをランダムに選択
  const activity = activityFunctions[getRandomInt(activityFunctions.length)]
  while (continuesAlerm) {
    continuesAlerm = activity()
  }
  // アラームを止める
  stopAlerm()
}
function runAlerm () {
  basic.showIcon(IconNames.Angry)
}
function stopAlerm () {
  basic.showIcon(IconNames.Happy)
}

// activities
function shakeActivityX () {
  shakeActivity('x')
}

function shakeActivityY () {
  shakeActivity('y')
}

function shakeActivityZ () {
  shakeActivity('z')
}

function shakeActivity (direction: 'x' | 'y' | 'z') {
  serial.writeString(`Shake in the ${direction}-axis direction.`)

  const dimension = getDimension(direction)
  const preAccel = input.acceleration(dimension)
  basic.pause(1000)

  // 加速度の差が一定量を超えたらインクリメント
  if (Math.abs(preAccel - input.acceleration(dimension)) > 200) {
    serial.writeString("OK.")
    serial.writeValue("times", activitySuccessCount)
    activitySuccessCount += 1
  } else {
    activitySuccessCount = 0
  }
  return activitySuccessCount < TIMES_LIMIT
}

function getDimension (direction: 'x' | 'y' | 'z') {
  switch (direction) {
    case 'x':
      return Dimension.X
    case 'y':
      return Dimension.Y
    case 'z':
      return Dimension.Z
  }
}
