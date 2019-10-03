import { decorate, observable, computed, action } from 'mobx'
import { BLACK, WHITE, EMPTY } from '../constants'

const checker = (code, isKing = false) => ({ code, isKing })
const black = checker(BLACK)
const white = checker(WHITE)
const empty = checker(EMPTY)

class CheckersStore {
  x = [1, 2, 3]
  board = [
    [ empty, black, empty, black, empty, black, empty, black ],
    [ black, empty, black, empty, black, empty, black, empty ],
    [ empty, empty, empty, empty, empty, empty, empty, empty ],
    [ empty, empty, empty, empty, empty, empty, empty, empty ],
    [ empty, empty, empty, empty, empty, empty, empty, empty ],
    [ empty, empty, empty, empty, empty, empty, empty, empty ],
    [ empty, white, empty, white, empty, white, empty, white ],
    [ white, empty, white, empty, white, empty, white, empty ],
  ]

  // get getCount() {
  //   return this.count
  // }

  // increase() {
  //   this.count = this.count + 1
  // }

  // decrease() {
  //   this.count = this.count - 1
  // }
}

decorate(CheckersStore, {
  // observable
  board: observable,
  x: observable,

  // computed
  // getCount: computed,

  // action
  // increase: action,
  // decrease: action,
})

export default CheckersStore
