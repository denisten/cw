import React from 'react';
import styled from 'styled-components';
import { zoomInOut } from '../../utils/zoomInOut';
import plus from './plus.svg';
import minus from './minus.svg';
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
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  transform: translateY(-50%);
  user-select: none;
  background-size: cover;

  i {
    width: 100%;
    height: 50%;
    display: block;
    cursor: pointer;

    &:first-child {
      background: url(${plus}) no-repeat center;
      background-size: 14px 14px;
    }
    &:last-child {
      background: url(${minus}) no-repeat center;
      background-size: 14px 4px;
    }
  }
`;

export const ZoomInOutButtons: React.FC<IZoomInOutButtons> = ({
  scaleValue,
}) => {
  return (
    <ButtonContainer>
      <i onClick={() => zoomInOut(-1, scaleValue)}></i>
      <i onClick={() => zoomInOut(1, scaleValue)}></i>
    </ButtonContainer>
  );
};

interface IZoomInOutButtons {
  scaleValue: number;
}
