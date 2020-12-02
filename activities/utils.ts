const TIMES_LIMIT = 10

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
