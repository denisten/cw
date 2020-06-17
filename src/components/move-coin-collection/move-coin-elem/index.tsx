import React from 'react';
import { ImoveCoinElements } from '../../../effector/app-condition/store';
import styled, { keyframes } from 'styled-components';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import { removeMoveElems } from '../../../effector/app-condition/events';

const coinAnimation = keyframes`
80% {
  top: 37px;
  left: 39px;
  opacity: 1;
}
100% {
  top: 37px;
  left: 39px;
  opacity: 0;
}
`;

const MoveCoin = styled.div<ImoveCoin>`
  position: absolute;
  width: 64px;
  height: 68px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background: red;
  z-index: ${ZIndexes.UI_BUTTON};
  animation: ${coinAnimation} 2s linear forwards;
  user-select: none;
`;

export const MoveCoinElem: React.FC<ImoveCoinElements> = ({ x, y, id }) => {
  const onAnimationEnd = (id: number) => {
    removeMoveElems(id);
  };
  return <MoveCoin x={x} y={y} onAnimationEnd={() => onAnimationEnd(id)} />;
};

interface ImoveCoin {
  x: number;
  y: number;
}
