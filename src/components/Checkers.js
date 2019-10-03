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
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Checkers = ({ size = 80, checkersStore }) => (
  <Wrapper size={size}>
    {[...Array(8).keys()].map(row =>
      [...Array(8).keys()].map(column => (
        <Square
          key={`${row}-${column}`}
          size={size}
          dark={(row + column) % 2 !== 0}
        >
          <Piece
            checker={checkersStore.board[row][column]}
            positon={{ row, column }}
          />
        </Square>
      )),
    )}
  </Wrapper>
)

export default inject('checkersStore')(observer(Checkers))
