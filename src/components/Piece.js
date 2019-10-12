import * as R from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { BLACK } from '../constants'
import KingIcon from './KingIcon'

const Circle = styled.div`
  background-color: ${props => (props.color === BLACK ? 'Black' : 'White')};
  box-shadow: ${props => (props.active ? '0 0 10px DarkOrange' : 'none')};
  width: ${props => props.size}%;
  height: ${props => props.size}%;
  border-radius: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.enabled ? 'pointer' : 'default')};

  &:after {
    content: '';
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    position: absolute;
    border: 1px solid
      ${props => (props.color === BLACK ? 'LightGray' : 'DimGrey')};
    border-radius: 100%;
    box-sizing: border-box;
  }
`

const Piece = ({ checkersStore, checker, position, ratio = 0.9 }) => {
  const availablePieces = checkersStore.getAvailablePieces
  const enabled = R.isEmpty(availablePieces)
    ? true
    : R.includes(position)(availablePieces)
  return (
    <React.Fragment>
      {checker.code ? (
        <Circle
          color={checker.code}
          enabled={enabled && checkersStore.turn === checker.code}
          active={R.equals(checkersStore.selected)(position)}
          size={ratio * 100}
          onClick={() =>
            enabled && checkersStore.clickOnPiece(checker.code, position)
          }
        >
          {checker.isKing ? (
            <KingIcon
              color={checker.code === BLACK ? 'LightGray' : 'DimGrey'}
              size={25}
            />
          ) : null}
        </Circle>
      ) : null}
    </React.Fragment>
  )
}

export default inject('checkersStore')(observer(Piece))
