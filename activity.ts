function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

const activityFunctions: (() => void)[] = [shakeActivityX, shakeActivityY, shakeActivityZ]

function getRandomActivity(): () => void {
  return activityFunctions[getRandomInt(activityFunctions.length)]
}
