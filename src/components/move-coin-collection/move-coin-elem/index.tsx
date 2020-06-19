import React from 'react';
import styled, { keyframes, Keyframes } from 'styled-components';
import { ZIndexes } from '../../root-component/z-indexes-enum';
import coinBg from '../../../UI/icons/coin.svg';
import tailAnim from './anim_tail.png';
import { Sprite } from '../../sprite';
import {
  removeMoveElems,
  setMoveCoinFinished,
} from '../../../effector/reward/events';
import { IMoveCoinElement } from '../../../effector/reward/store';

const scaleTile = keyframes`
0% {
    transform: scale(0.5);
}

50% {
  opacity: 1;
  transform: scale(1);
}

75% {
  opacity: 0.8;
  transform: scale(1.1);
}

100% {
    transform: scale(1.15);
    opacity: 0;
}
`;

const delta = 200;
const coinMoveAnimationDuration = 1000;

const MoveCoin = styled.div`
  position: absolute;
  width: 55px;
  height: 55px;
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
  z-index: ${ZIndexes.COIN};
  animation: ${props => props.keyframe} ${coinMoveAnimationDuration}ms linear
    forwards;
  user-select: none;
`;

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
    top: '22px',
    left: '10px',
    width: '120px',
    height: '80px',
  } as React.CSSProperties,
};
const shiftDelta = { x: 130, y: 100 };
const keyframeGenerator = (x: number, y: number) => {
  return keyframes`
                100% {
                transform: translate(${
                  x - shiftDelta.x <= 0
                    ? Math.abs(x - shiftDelta.x)
                    : shiftDelta.x - x
                }px,
                    ${
                      y - shiftDelta.y <= 0
                        ? Math.abs(y - shiftDelta.y)
                        : shiftDelta.y - y
                    }px) scale(0.8);
                }
      `;
};

export const MoveCoinElem: React.FC<IMoveCoinElement> = ({ x, y, id }) => {
  const onAnimationEnd = (id: number) => {
    removeMoveElems(id);
    setMoveCoinFinished(true);

    setTimeout(() => {
      setMoveCoinFinished(false);
    }, coinMoveAnimationDuration);
  };

  return (
    <MoveWrapper
      x={x}
      y={y}
      onAnimationEnd={() => onAnimationEnd(id)}
      keyframe={keyframeGenerator(x, y)}
    >
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
  keyframe: Keyframes;
}
