type TDirection = 'x' | 'y' | 'z'

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

function shakeActivityX () {
  shakeActivity('x')
}

function shakeActivityY () {
  shakeActivity('y')
}

function shakeActivityZ () {
  shakeActivity('z')
}

// 10秒間指定方向に振り続ける
function shakeActivity (direction: TDirection) {
  const activityTime = 10

  serial.writeLine(`Shake in the ${direction}-axis direction.`)

  const dimension = getDimension(direction)
  let successCount = 0

  // 約1秒ごとの処理
  while (successCount < activityTime) {
    const preAccel = input.acceleration(dimension)

    // 0.1秒ごとに指定方向の加速度をとり, 1秒間の最大加速値を出す
    let maxAccel = 0
    for (let i = 0; i < 10; i++) {
      basic.pause(100)
      maxAccel = Math.max(maxAccel, input.acceleration(dimension))
    }

    // 加速度の差が一定量を超えたらインクリメント
    if (Math.abs(preAccel - maxAccel) > 100) {
      serial.writeValue('OK', successCount)
      successCount += 1
    } else {
      serial.writeLine('NO.')
      successCount = 0
    }
  }

  serial.writeLine('cleared.')
}
