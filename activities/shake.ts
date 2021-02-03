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
  shake10Times('x', 0)
}

function shakeActivityY () {
  shake10Times('y', 1)
}

function shakeActivityZ () {
  shake10Times('z', 2)
}

// 10秒間指定方向に振り続ける
function shake10Times (direction: TDirection, shakeIndex: number) {
  basic.showString(direction)

  playVoice(trackCategory.shake[shakeIndex])
  // 再生時間だけ待機
  basic.pause(5 * 1000)

  let successCount = 0
  let cheerCount = 0
  let notShakingTime = 0

  // 約1秒ごとの処理
  while (successCount < 10) {
    basic.showNumber(successCount);

    if (shakeActivity('x'))
      successCount++;
    if (shakeActivity('y'))
      successCount++;
    if (shakeActivity('z'))
      successCount++;

    if (!successCount) {
      notShakingTime++;
      // 5秒何もなかったら再生
      if (notShakingTime > 5) {
        playVoice(trackCategory.shake[shakeIndex])
        notShakingTime = 0
      }
    } else {
      notShakingTime = 0
    }

    // その調子! (3回に1回)
    if (1 < successCount && successCount < 5) {
      if (!cheerCount)
        playVoice(trackCategory.cheer[2])
      cheerCount = (cheerCount + 1) % 3
    }

    // カウントダウン
    // if (successCount > 7)
    //   playVoice(trackCategory.counter[10 - successCount])
  }
}

function shakeActivity (direction: TDirection): boolean {
  const dimension = getDimension(direction)
  const preAccel = input.acceleration(dimension)

  // 0.1秒ごとに指定方向の加速度をとり, 1秒間の最大加速値を出す
  let maxAccel = 0
  for (let i = 0; i < 5; i++) {
    basic.pause(100)
    maxAccel = Math.max(maxAccel, input.acceleration(dimension))
  }

  // 加速度の差が一定量を超えたらok
  return Math.abs(preAccel - maxAccel) > 200;
}
