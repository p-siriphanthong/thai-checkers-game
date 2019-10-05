import * as R from 'ramda'
import { decorate, observable, computed, action } from 'mobx'
import { BLACK, WHITE, EMPTY } from '../constants'
import getWhiteDirection from '../selectors/getWhiteDirection'
import getBlackDirection from '../selectors/getWhiteDirection'
import getKingDirection from '../selectors/getWhiteDirection'

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
      if (piece.code === WHITE) return getWhiteDirection(this.board, this.selected)
      return getBlackDirection(this.board, this.selected)
    }
    return []
  }

  clickOnPiece(code, position) {
    if (this.turn === code) {
      this.selected = R.equals(this.selected)(position) ? null : position
    }
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
})

export default CheckersStore
