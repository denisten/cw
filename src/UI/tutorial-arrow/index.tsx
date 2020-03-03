import React from 'react';
import styled, { keyframes } from 'styled-components';
import arrowImg from './arrow.png';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

const horizontalMove = (range: number) => keyframes`
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: ${range}%;
  }
`;

const verticalMove = (range: number) => keyframes`
  0% {
    margin-top: 0;
  }
  100% {
    margin-top: ${range}%;
  }
`;

export enum Directions {
  RIGHT = 'right',
  LEFT = 'left',
  BOTTOM = 'bottom',
  TOP = 'top',
}

export enum RotationDeg {
  BOTTOM = 0,
  LEFT = 90,
  TOP = 180,
  RIGHT = 270,
}

type ArrowImgWrapperProps = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  direction: Directions;
  range: number;
};

const detectRotation = (direction: Directions) => {
  switch (direction) {
    case Directions.BOTTOM:
      return RotationDeg.BOTTOM;
    case Directions.RIGHT:
      return RotationDeg.RIGHT;
    case Directions.LEFT:
      return RotationDeg.LEFT;
    case Directions.TOP:
      return RotationDeg.TOP;
  }
};

const detectAnimationRotation = (direction: Directions, range: number) => {
  switch (direction) {
    case Directions.RIGHT:
    case Directions.LEFT:
      return horizontalMove(range);
    case Directions.TOP:
    case Directions.BOTTOM:
      return verticalMove(range);
  }
};

const ArrowImgWrapper = styled.img<ArrowImgWrapperProps>`
  position: absolute;
  left: ${props => props.left}%;
  right: ${props => props.right}%;
  bottom: ${props => props.bottom}%;
  top: ${props => props.top}%;
  width: 105px;
  height: 175px;
  z-index: 80;
  transform: rotate(${props => detectRotation(props.direction)}deg);
  animation-name: ${props =>
    detectAnimationRotation(props.direction, props.range)};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-fill-mode: both;
  animation-direction: alternate;
`;

export const TutorialArrow: React.FC<ArrowImgWrapperProps> = props => {
  return <ArrowImgWrapper {...props} src={arrowImg} alt="arrow" />;
};
