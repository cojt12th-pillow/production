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
  playVoice(trackCategory.shake[0])
  // 再生時間だけ待機
  shake10Times('x', 0)
}

function shakeActivityY () {
  playVoice(trackCategory.shake[1])
  // 再生時間だけ待機
  shake10Times('y', 1)
}

function shakeActivityZ () {
  playVoice(trackCategory.shake[2])
  // 再生時間だけ待機
  shake10Times('z', 2)
}

// 10秒間指定方向に振り続ける
function shake10Times (direction: TDirection, shakeIndex: number) {
  let successCount = 0
  let notShakingTime = 0

  // 約1秒ごとの処理
  while (successCount < 10) {
    if (shakeActivity(direction))
      successCount++;

    if (successCount === 0) {
      notShakingTime++;
      // 5秒何もなかったら再生
      if (notShakingTime > 5)
        playVoice(trackCategory.shake[shakeIndex])
      notShakingTime = 0
    } else {
      notShakingTime = 0
    }

    // その調子!
    if (1 < successCount && successCount < 5)
      playVoice(trackCategory.cheer[getRandomInt(1)])

    // カウントダウン
    if (successCount > 5)
      playVoice(trackCategory.counter[10 - successCount])
  }
}

function shakeActivity (direction: TDirection): boolean {
  const dimension = getDimension(direction)
  const preAccel = input.acceleration(dimension)

  // 0.1秒ごとに指定方向の加速度をとり, 1秒間の最大加速値を出す
  let maxAccel = 0
  for (let i = 0; i < 10; i++) {
    basic.pause(100)
    maxAccel = Math.max(maxAccel, input.acceleration(dimension))
  }

  // 加速度の差が一定量を超えたらok
  return Math.abs(preAccel - maxAccel) > 200;
}
