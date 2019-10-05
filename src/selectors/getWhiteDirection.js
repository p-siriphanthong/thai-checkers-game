import * as R from 'ramda'
import { BLACK, EMPTY } from '../constants'

const getLeftDirection = (board, position) => {
  const availablePositions = []
  const code = R.path([position.row - 1, position.column - 1, 'code'])(board)
  if (code === EMPTY) {
    availablePositions.push({
      row: position.row - 1,
      column: position.column - 1,
    })
  } else if (
    code === BLACK &&
    R.path([position.row - 2, position.column - 2, 'code'])(board) === EMPTY
  ) {
    availablePositions.push({
      row: position.row - 2,
      column: position.column - 2,
    })
  }
  return availablePositions
}

const getRightDirection = (board, position) => {
  const availablePositions = []
  const code = R.path([position.row - 1, position.column + 1, 'code'])(board)
  if (code === EMPTY) {
    availablePositions.push({
      row: position.row - 1,
      column: position.column + 1,
    })
  } else if (
    code === BLACK &&
    R.path([position.row - 2, position.column + 2, 'code'])(board) === EMPTY
  ) {
    availablePositions.push({
      row: position.row - 2,
      column: position.column + 2,
    })
  }
  return availablePositions
}

const getWhiteDirection = (board, position) =>
  R.concat(
    getLeftDirection(board, position),
    getRightDirection(board, position),
  )

export default getWhiteDirection
