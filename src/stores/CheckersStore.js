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

  get getAvailablePieces() {
    const availablePieces = []
    this.board.forEach((columns, row) => {
      columns.forEach((piece, column) => {
        const position = { row, column }
        if (
          piece.code === this.turn &&
          !R.isEmpty(
            this.getDirection(piece, this.turn, this.board, position, true),
          )
        )
          availablePieces.push(position)
      })
    })
    return availablePieces
  }

  get getAvailablePositions() {
    if (this.selected) {
      const piece = this.board[this.selected.row][this.selected.column]
      return this.getDirection(
        piece,
        this.turn,
        this.board,
        this.selected,
        this.isContinouse,
      )
    }
    return []
  }

  get getWinner() {
    if (!R.filter(({ code }) => code === BLACK)(R.flatten(this.board)).length)
      return WHITE
    if (!R.filter(({ code }) => code === WHITE)(R.flatten(this.board)).length)
      return BLACK
    return undefined
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

  reset() {
    this.board = initialBoard
    this.turn = WHITE
    this.selected = null
    this.isContinouse = false
  }

  getDirection(piece, code, board, position, mustCapture) {
    if (piece.isKing)
      return getKingDirection(code, board, position, mustCapture)
    if (piece.code === WHITE)
      return getWhiteDirection(board, position, mustCapture)
    return getBlackDirection(board, position, mustCapture)
  }
}

decorate(CheckersStore, {
  // observable
  board: observable,
  turn: observable,
  selected: observable,

  // computed
  getAvailablePieces: computed,
  getAvailablePositions: computed,
  getWinner: computed,

  // action
  clickOnPiece: action,
  move: action,
  reset: action,
})

export default CheckersStore
