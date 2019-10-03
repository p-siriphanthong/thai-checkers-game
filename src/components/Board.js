import React from 'react'
import { observer, inject } from 'mobx-react'

const Board = ({ size = 80, checkersStore }) => (
  <>
    <div>
      <button className='increase' onClick={() => checkersStore.increase()}>
        +
      </button>
      <span>{checkersStore.getCount}</span>
      <button className='decrease' onClick={() => checkersStore.decrease()}>
        -
      </button>
    </div>
  </>
)

export default inject('checkersStore')(observer(Board))
