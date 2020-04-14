import React from 'react';
import styled from 'styled-components';
import { zoomInOut } from '../../utils/zoomInOut';
import plus from './plus.svg';
import minus from './minus.svg';
import plusHover from './plus-hover.svg';
import minusHover from './minus-hover.svg';
import body from './zoom.png';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 66px;
  height: 102px;
  background: url(${body}) no-repeat center;
  position: fixed;
  top: 50%;
  right: 26px;
  z-index: 1;
  padding: 12px 0;
  box-sizing: border-box;
  transform: translateY(-50%);
  user-select: none;
  background-size: cover;

  i {
    width: 100%;
    height: 50%;
    display: block;
    cursor: pointer;
    transition: 0.3s;

    &:first-child {
      background: url(${plus}) no-repeat center;
      background-size: 14px 14px;
      &:hover {
        background: url(${plusHover}) no-repeat center;
      }
    }
    &:last-child {
      background: url(${minus}) no-repeat center;
      background-size: 14px 4px;
      &:hover {
        background: url(${minusHover}) no-repeat center;
      }
    }
  }
`;

export const ZoomInOutButtons: React.FC<IZoomInOutButtons> = ({
  scaleValue,
}) => {
  return (
    <ButtonContainer>
      <i onClick={() => zoomInOut(-1, scaleValue)} />
      <i onClick={() => zoomInOut(1, scaleValue)} />
    </ButtonContainer>
  );
};

interface IZoomInOutButtons {
  scaleValue: number;
}