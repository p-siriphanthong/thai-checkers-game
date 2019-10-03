import React from 'react'
import styled from 'styled-components'
import { BLACK } from '../constants'
import KingIcon from './KingIcon'

const Circle = styled.div`
  background-color: ${props => (props.color === BLACK ? 'Black' : 'White')};
  width: ${props => props.size}%;
  height: ${props => props.size}%;
  border-radius: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    position: absolute;
    border: 1px solid ${props => (props.color === BLACK ? 'LightGray' : 'DimGrey')};
    border-radius: 100%;
    box-sizing: border-box;
  }
`

const Piece = ({ checker, position, ratio = 0.9 }) => (
  <React.Fragment>
    {checker.code ? (
      <Circle color={checker.code} size={ratio * 100}>
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

export default Piece
