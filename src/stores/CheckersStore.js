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

  get getAvailablePositions() {
    if (this.selected) {
      const piece = this.board[this.selected.row][this.selected.column]
      if (piece.isKing) return getKingDirection(this.board, this.selected)
      if (piece.code === WHITE)
        return getWhiteDirection(this.board, this.selected)
      return getBlackDirection(this.board, this.selected)
    }
    return []
  }

  clickOnPiece(code, position) {
    if (this.turn === code) {
      this.selected = R.equals(this.selected)(position) ? null : position
    }
  }

  move(newPosition) {
    const piece = this.board[this.selected.row][this.selected.column]
    this.board[this.selected.row][this.selected.column] = empty
    this.board[newPosition.row][newPosition.column] = piece
    this.turn = this.turn === WHITE ? BLACK : WHITE
    this.selected = null
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
