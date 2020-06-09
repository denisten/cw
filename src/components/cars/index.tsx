import React from 'react';
import styled, { Keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';

type CarProps = {
  animDuration?: string;
  animationTimingFunction?: string;
  animationName?: Keyframes;
  top?: string;
  left?: string;
  width?: string;
  height?: string;
};

type CarConfigureType = {
  carStyle: CarProps;
};

const CarBlock = styled.div<CarProps>`
  width: ${props => props.width || '44px'};
  height: ${props => props.height || '41px'};
  position: absolute;
  background-size: 100% 100%;
  animation-duration: ${props => props.animDuration || '5s'};
  animation-timing-function: ${props =>
    props.animationTimingFunction || 'ease-in-out'};
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-name: ${props => props.animationName};
  z-index: ${ZIndexes.CARS};
  top: ${props => props.top};
  left: ${props => props.left};
`;

export const Car: React.FC<CarConfigureType> = ({ carStyle }) => {
  const {
    animDuration,
    animationTimingFunction,
    animationName,
    ...props
  } = carStyle;
  return (
    <CarBlock
      {...props}
      animationName={animationName}
      animationTimingFunction={animationTimingFunction}
      animDuration={animDuration}
    />
  );
};
