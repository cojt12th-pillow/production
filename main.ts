const TIMES_LIMIT = 10
const activityFunctions: (() => void)[] = [shakeActivityX, shakeActivityY, shakeActivityZ]

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
  // 音を鳴らしたりする
  runAlerm()
  // アクティビティをランダムに選択
  const activity = activityFunctions[getRandomInt(activityFunctions.length)]
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

type TDirection = 'x' | 'y' | 'z'

// 10回加速度の変化が見られるまで
function shakeActivity (direction: TDirection) {
  serial.writeString(`Shake in the ${direction}-axis direction.`)

  const dimension = getDimension(direction)
  let activitySuccessCount = 0

  while (activitySuccessCount < TIMES_LIMIT) {
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
  }

  serial.writeString('cleared.')
}

function getDimension (direction: TDirection) {
  switch (direction) {
    case 'x':
      return Dimension.X
    case 'y':
      return Dimension.Y
    case 'z':
      return Dimension.Z
  }
}
