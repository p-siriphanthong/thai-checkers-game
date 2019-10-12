import * as R from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import Piece from './Piece'

const Wrapper = styled.div`
  width: ${props => props.size * 8}px;
  height: ${props => props.size * 8}px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`

const Square = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => (props.dark ? 'DimGrey' : 'LightGrey')};
  box-shadow: ${props => (props.active ? 'inset 0 0 10px DarkOrange' : 'none')};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.active ? 'pointer' : 'default')};
`

const Checkers = ({ checkersStore, size = 80 }) => {
  const availablePositions = checkersStore.getAvailablePositions
  return (
    <Wrapper size={size}>
      {[...Array(8).keys()].map(row =>
        [...Array(8).keys()].map(column => {
          const position = { row, column }
          const availablePosition = R.find(availablePosition =>
            R.and(
              R.propEq('row', position.row)(availablePosition),
              R.propEq('column', position.column)(availablePosition),
            ),
          )(availablePositions)
          return (
            <Square
              key={`${row}-${column}`}
              active={!R.isNil(availablePosition)}
              dark={(row + column) % 2 !== 0}
              size={size}
              onClick={
                !R.isNil(availablePosition)
                  ? () => checkersStore.move(availablePosition)
                  : undefined
              }
            >
              <Piece
                checker={checkersStore.board[row][column]}
                position={position}
              />
            </Square>
          )
        }),
      )}
    </Wrapper>
  )
}

export default inject('checkersStore')(observer(Checkers))
