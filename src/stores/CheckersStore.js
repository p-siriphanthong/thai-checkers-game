import * as R from 'ramda'
import { decorate, observable, computed, action } from 'mobx'
import { BLACK, WHITE, EMPTY } from '../constants'
import getWhiteDirection from '../selectors/getWhiteDirection'
import getBlackDirection from '../selectors/getBlackDirection'
import getKingDirection from '../selectors/getKingDirection'

const checker = (code, isKing = false) => ({ code, isKing })
const black = checker(BLACK)
const white = checker(WHITE)
const empty = checker(EMPTY)

const initialBoard = [
  [empty, black, empty, black, empty, black, empty, black],
  [black, empty, black, empty, black, empty, black, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, empty, empty, empty, empty, empty, empty, empty],
  [empty, white, empty, white, empty, white, empty, white],
  [white, empty, white, empty, white, empty, white, empty],
]

class CheckersStore {
  board = initialBoard
  turn = WHITE
  selected = null
  isContinouse = false

  get getAvailablePositions() {
    if (this.selected) {
      const piece = this.board[this.selected.row][this.selected.column]
      if (piece.isKing)
        return getKingDirection(this.board, this.selected, this.isContinouse)
      if (piece.code === WHITE)
        return getWhiteDirection(this.board, this.selected, this.isContinouse)
      return getBlackDirection(this.board, this.selected, this.isContinouse)
    }
    return []
  }

  clickOnPiece(code, position) {
    if (this.turn === code) {
      this.selected = R.equals(this.selected)(position) ? null : position
    }
  }

  move({ captured, ...newPosition }) {
    // move
    const piece = this.board[this.selected.row][this.selected.column]
    this.board[this.selected.row][this.selected.column] = empty
    this.board[newPosition.row][newPosition.column] = piece

    // captured enemy piece
    if (captured) {
      this.board[captured.row][captured.column] = empty
      this.selected = newPosition
      this.isContinouse = true
      if (!R.isEmpty(this.getAvailablePositions)) return
    }

    // isKing
    if (this.turn === WHITE && newPosition.row === 0)
      this.board[newPosition.row][newPosition.column].isKing = true
    else if (this.turn === BLACK && newPosition.row === 7)
      this.board[newPosition.row][newPosition.column].isKing = true

    // end turn
    this.turn = this.turn === WHITE ? BLACK : WHITE
    this.selected = null
    this.isContinouse = false
  }
}

decorate(CheckersStore, {
  // observable
  board: observable,
  turn: observable,
  selected: observable,

  // computed
  getAvailablePositions: computed,

  // action
  clickOnPiece: action,
  move: action,
})

export default CheckersStore
