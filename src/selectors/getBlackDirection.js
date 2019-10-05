import * as R from 'ramda'
import { WHITE, EMPTY } from '../constants'

const getLeftDirection = (board, position) => {
  const availablePositions = []
  const leftCode = R.path([position.row + 1, position.column - 1, 'code'])(
    board,
  )
  if (leftCode === EMPTY) {
    availablePositions.push({
      row: position.row + 1,
      column: position.column - 1,
    })
  } else if (
    leftCode === WHITE &&
    R.path([position.row + 2, position.column - 2, 'code'])(board) === EMPTY
  ) {
    availablePositions.push({
      row: position.row + 2,
      column: position.column - 2,
    })
  }
  return availablePositions
}

const getRightDirection = (board, position) => {
  const availablePositions = []
  const rightCode = R.path([position.row + 1, position.column + 1, 'code'])(
    board,
  )
  if (rightCode === EMPTY) {
    availablePositions.push({
      row: position.row + 1,
      column: position.column + 1,
    })
  } else if (
    rightCode === WHITE &&
    R.path([position.row + 2, position.column + 2, 'code'])(board) === EMPTY
  ) {
    availablePositions.push({
      row: position.row + 2,
      column: position.column + 2,
    })
  }
  return availablePositions
}

export default (board, position) =>
  R.concat(
    getLeftDirection(board, position),
    getRightDirection(board, position),
  )
