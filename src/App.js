import React from 'react'
import styled from 'styled-components'
import { Provider, observer } from 'mobx-react'
import CheckersStore from './stores/CheckersStore'
import Checkers from './components/Checkers'
import { BLACK } from './constants'

const checkersStore = new CheckersStore()

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 15px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  color: DarkOrange;
  margin-top: 0;
  margin-bottom: 10px;
`

const Turn = styled.p`
  color: ${props => (props.code === BLACK ? 'black' : 'white')};
  margin-top: 0;
`

const Link = styled.a`
  color: DarkOrange;
  margin-left: 10px;
  cursor: pointer;
`

const App = () => {
  const winner = checkersStore.getWinner
  return (
    <Provider checkersStore={checkersStore}>
      <Wrapper>
        <Title>Thai Checkers Game</Title>
        {winner ? (
          <Turn code={winner}>
            {winner === BLACK ? 'black' : 'white'} win!
            <Link onClick={() => checkersStore.reset()}>play again?</Link>
          </Turn>
        ) : (
          <Turn code={checkersStore.turn}>
            {checkersStore.turn === BLACK ? 'black' : 'white'} turn
          </Turn>
        )}
        <Checkers />
      </Wrapper>
    </Provider>
  )
}

export default observer(App)
