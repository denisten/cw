import React from 'react';
import styled from 'styled-components';
import { zoomInOut } from '../../utils/zoomInOut';
import plus from './plus.svg';
import minus from './minus.svg';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 44px;
  height: 80px;
  box-shadow: 0 0 10px 0 rgba(26, 29, 34, 0.6);
  border: solid 2px #ffffff;
  background-image: linear-gradient(to bottom, #fdfdfd 37%, #f2f2f2);
  clip-path: polygon(
    80% 0,
    100% 10%,
    100% 60%,
    100% 100%,
    20% 100%,
    0 90%,
    0 0
  );
  position: fixed;
  top: 50%;
  right: 36px;
  z-index: 1;
  padding: 14px 0 18px 0;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  transform: translateY(-50%);
  user-select: none;

  i {
    width: 14px;
    display: block;
    cursor: pointer;

    &:first-child {
      height: 14px;
      background: url(${plus}) no-repeat center;
    }
    &:last-child {
      height: 4px;
      background: url(${minus}) no-repeat center;
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
