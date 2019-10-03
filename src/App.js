import React from 'react'
import { Provider } from 'mobx-react'
import CheckersStore from './stores/CheckersStore'
import Checkers from './components/Checkers'

const checkersStore = new CheckersStore()

const App = () => (
  <Provider checkersStore={checkersStore}>
    <Checkers />
  </Provider>
)

export default App
