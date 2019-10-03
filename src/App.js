import React from 'react'
import { Provider } from 'mobx-react'
import CheckersStore from './stores/CheckersStore'
import Board from './components/Board'

const checkersStore = new CheckersStore()

const App = () => (
  <Provider checkersStore={checkersStore}>
    <Board />
  </Provider>
)

export default App
