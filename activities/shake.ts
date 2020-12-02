function shakeActivityX () {
  shakeActivity('x')
}

function shakeActivityY () {
  shakeActivity('y')
}

function shakeActivityZ () {
  shakeActivity('z')
}

// 10回加速度の変化が見られるまで
function shakeActivity (direction: TDirection) {
  serial.writeString(`Shake in the ${direction}-axis direction.`)

  const dimension = getDimension(direction)
  let successCount = 0

  while (successCount < TIMES_LIMIT) {
    const preAccel = input.acceleration(dimension)
    basic.pause(1000)

    // 加速度の差が一定量を超えたらインクリメント
    if (Math.abs(preAccel - input.acceleration(dimension)) > 200) {
      serial.writeString("OK.")
      serial.writeValue("times", successCount)
      successCount += 1
    } else {
      serial.writeString("NO.")
      successCount = 0
    }
  }

  serial.writeString('cleared.')
}
