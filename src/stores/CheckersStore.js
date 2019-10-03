import { decorate, observable, computed, action } from 'mobx'

class CheckersStore {
  count = 0

  get getCount() {
    return this.count
  }

  increase() {
    this.count = this.count + 1
  }

  decrease() {
    this.count = this.count - 1
  }
}

decorate(CheckersStore, {
  // observable
  count: observable,

  // computed
  getCount: computed,

  // action
  increase: action,
  decrease: action,
})

export default CheckersStore
