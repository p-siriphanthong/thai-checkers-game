import * as R from 'ramda'
import { BLACK, WHITE, EMPTY } from '../constants'

const getEnemyCode = code => (code === WHITE ? BLACK : WHITE)

const getLeftTopDirection = (code, board, position, mustCapture) => {
  const availablePositions = []
  const enemyCode = getEnemyCode(code)

  let calculatePosition = { row: position.row - 1, column: position.column - 1 }
  while (calculatePosition.row >= 0 && calculatePosition.column >= 0) {
    const calculateCode = R.path([
      calculatePosition.row,
      calculatePosition.column,
      'code',
    ])(board)
    if (!mustCapture && calculateCode === EMPTY) {
      availablePositions.push(calculatePosition)
    } else if (
      calculateCode === enemyCode &&
      calculatePosition.row - 1 >= 0 &&
      calculatePosition.column - 1 >= 0 &&
      R.path([calculatePosition.row - 1, calculatePosition.column - 1, 'code'])(
        board,
      ) === EMPTY
    ) {
      availablePositions.push({
        row: calculatePosition.row - 1,
        column: calculatePosition.column - 1,
        captured: calculatePosition,
      })
      break
    }
    calculatePosition = {
      row: calculatePosition.row - 1,
      column: calculatePosition.column - 1,
    }
  }
  return availablePositions
}

const getRightTopDirection = (code, board, position, mustCapture) => {
  const availablePositions = []
  const enemyCode = getEnemyCode(code)

  let calculatePosition = { row: position.row - 1, column: position.column + 1 }
  while (calculatePosition.row >= 0 && calculatePosition.column <= 7) {
    const calculateCode = R.path([
      calculatePosition.row,
      calculatePosition.column,
      'code',
    ])(board)
    if (!mustCapture && calculateCode === EMPTY) {
      availablePositions.push(calculatePosition)
    } else if (
      calculateCode === enemyCode &&
      calculatePosition.row - 1 >= 0 &&
      calculatePosition.column + 1 <= 7 &&
      R.path([calculatePosition.row - 1, calculatePosition.column + 1, 'code'])(
        board,
      ) === EMPTY
    ) {
      availablePositions.push({
        row: calculatePosition.row - 1,
        column: calculatePosition.column + 1,
        captured: calculatePosition,
      })
      break
    }
    calculatePosition = {
      row: calculatePosition.row - 1,
      column: calculatePosition.column + 1,
    }
  }
  return availablePositions
}

const getLeftBottomDirection = (code, board, position, mustCapture) => {
  const availablePositions = []
  const enemyCode = getEnemyCode(code)

  let calculatePosition = { row: position.row + 1, column: position.column - 1 }
  while (calculatePosition.row <= 7 && calculatePosition.column >= 0) {
    const calculateCode = R.path([
      calculatePosition.row,
      calculatePosition.column,
      'code',
    ])(board)
    if (!mustCapture && calculateCode === EMPTY) {
      availablePositions.push(calculatePosition)
    } else if (
      calculateCode === enemyCode &&
      calculatePosition.row + 1 <= 7 &&
      calculatePosition.column - 1 >= 0 &&
      R.path([calculatePosition.row + 1, calculatePosition.column - 1, 'code'])(
        board,
      ) === EMPTY
    ) {
      availablePositions.push({
        row: calculatePosition.row + 1,
        column: calculatePosition.column - 1,
        captured: calculatePosition,
      })
      break
    }
    calculatePosition = {
      row: calculatePosition.row + 1,
      column: calculatePosition.column - 1,
    }
  }
  return availablePositions
}

const getRightBottomDirection = (code, board, position, mustCapture) => {
  const availablePositions = []
  const enemyCode = getEnemyCode(code)

  let calculatePosition = { row: position.row + 1, column: position.column + 1 }
  while (calculatePosition.row <= 7 && calculatePosition.column <= 7) {
    const calculateCode = R.path([
      calculatePosition.row,
      calculatePosition.column,
      'code',
    ])(board)
    if (!mustCapture && calculateCode === EMPTY) {
      availablePositions.push(calculatePosition)
    } else if (
      calculateCode === enemyCode &&
      calculatePosition.row + 1 <= 7 &&
      calculatePosition.column + 1 <= 7 &&
      R.path([calculatePosition.row + 1, calculatePosition.column + 1, 'code'])(
        board,
      ) === EMPTY
    ) {
      availablePositions.push({
        row: calculatePosition.row + 1,
        column: calculatePosition.column + 1,
        captured: calculatePosition,
      })
      break
    }
    calculatePosition = {
      row: calculatePosition.row + 1,
      column: calculatePosition.column + 1,
    }
  }
  return availablePositions
}

export default (code, board, position, mustCapture) => [
  ...getLeftTopDirection(code, board, position, mustCapture),
  ...getRightTopDirection(code, board, position, mustCapture),
  ...getLeftBottomDirection(code, board, position, mustCapture),
  ...getRightBottomDirection(code, board, position, mustCapture),
]
