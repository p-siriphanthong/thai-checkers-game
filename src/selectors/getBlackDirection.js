import * as R from 'ramda'
import { WHITE, EMPTY } from '../constants'

const getLeftDirection = (board, position, mustCapture) => {
  const availablePositions = []
  const leftCode =
    position.row + 1 <= 7 && position.column - 1 >= 0
      ? R.path([position.row + 1, position.column - 1, 'code'])(board)
      : undefined
  if (!mustCapture && leftCode === EMPTY) {
    availablePositions.push({
      row: position.row + 1,
      column: position.column - 1,
    })
  } else if (
    leftCode === WHITE &&
    position.row + 2 <= 7 &&
    position.column - 2 >= 0 &&
    R.path([position.row + 2, position.column - 2, 'code'])(board) === EMPTY
  ) {
    availablePositions.push({
      row: position.row + 2,
      column: position.column - 2,
      captured: { row: position.row + 1, column: position.column - 1 },
    })
  }
  return availablePositions
}

const getRightDirection = (board, position, mustCapture) => {
  const availablePositions = []
  const rightCode =
    position.row + 1 <= 7 && position.column + 1 <= 7
      ? R.path([position.row + 1, position.column + 1, 'code'])(board)
      : undefined
  if (!mustCapture && rightCode === EMPTY) {
    availablePositions.push({
      row: position.row + 1,
      column: position.column + 1,
    })
  } else if (
    rightCode === WHITE &&
    position.row + 2 <= 7 &&
    position.column + 2 <= 7 &&
    R.path([position.row + 2, position.column + 2, 'code'])(board) === EMPTY
  ) {
    availablePositions.push({
      row: position.row + 2,
      column: position.column + 2,
      captured: { row: position.row + 1, column: position.column + 1 },
    })
  }
  return availablePositions
}

export default (board, position, mustCapture) => [
  ...getLeftDirection(board, position, mustCapture),
  ...getRightDirection(board, position, mustCapture),
]
