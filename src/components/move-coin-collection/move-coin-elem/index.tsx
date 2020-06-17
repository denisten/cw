import React from 'react';
import { ImoveCoinElements } from '../../../effector/app-condition/store';
import styled, { keyframes } from 'styled-components';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import {
  removeMoveElems,
  setMoveCoinFinished,
} from '../../../effector/app-condition/events';
import coinBg from '../../markers/coin.svg';
import tailAnim from './anim_tail.png';
import { Sprite } from '../../sprite';
import { coinMoveAnimationDuration } from '../../../constants';

const coinAnimation = keyframes`
60% {
  /* top: 90px;
  left: 120px; */
  opacity: 1;
  transform: scale(1);
}

80% {
    opacity: 0.8;
    transform: scale(0.7);
}
100% {
  top: 100px;
  left: 130px;
  opacity: 0.4;
  transform: scale(0.6);
}
`;

const MoveCoin = styled.div`
  position: absolute;
  width: 64px;
  height: 68px;
  left: 0px;
  top: 0px;
  background: url(${coinBg}) no-repeat center;
  background-size: 100% 100%;
  z-index: 2;
`;

const MoveWrapper = styled.div<ImoveCoin>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: ${ZIndexes.UI_BUTTON};
  animation: ${coinAnimation} ${coinMoveAnimationDuration}ms linear forwards;
  user-select: none;
`;

const scaleTile = keyframes`
0% {
    transform: scale(0.5);
}
95% {
    transform: scale(1.1);
    opacity: 1;
}

100% {
    transform: scale(1.1);
    opacity: 0;
}
`;
const delta = 200;
const SpriteWrapper = styled.div`
  animation: ${scaleTile} ${coinMoveAnimationDuration - delta}ms linear forwards;
`;

const commonSpriteSetting = {
  canvasWidth: 70,
  canvasHeight: 223,
  numberOfFramesX: 7,
  numberOfFramesY: 2,
  ticksPerFrame: 4,
  infinity: true,

  style: {
    position: 'absolute',
    top: '26px',
    left: '18px',
    width: '120px',
    height: '80px',
  } as React.CSSProperties,
};

export const MoveCoinElem: React.FC<ImoveCoinElements> = ({ x, y, id }) => {
  const onAnimationEnd = (id: number) => {
    removeMoveElems(id);
    setMoveCoinFinished(true);

    setTimeout(() => {
      setMoveCoinFinished(false);
    }, coinMoveAnimationDuration);
  };
  return (
    <MoveWrapper x={x} y={y} onAnimationEnd={() => onAnimationEnd(id)}>
      <MoveCoin />
      <SpriteWrapper onAnimationEnd={e => e.stopPropagation()}>
        <Sprite {...commonSpriteSetting} img={tailAnim} />
      </SpriteWrapper>
    </MoveWrapper>
  );
};

interface ImoveCoin {
  x: number;
  y: number;
}
