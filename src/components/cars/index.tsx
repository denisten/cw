import React from 'react';
import styled, { Keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';

type CarProps = {
  animDuration?: string;
  animationTimingFunction?: string;
  animationName: Keyframes;
};

type CarConfigureType = {
  carStyle: CarProps;
};

const CarBlock = styled.div<CarProps>`
  width: 57px;
  height: 50px;
  position: absolute;
  background-size: 100% 100%;
  animation-duration: ${props => props.animDuration || '5s'};
  animation-timing-function: ${props =>
    props.animationTimingFunction || 'ease-in-out'};
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-name: ${props => props.animationName};
  z-index: ${ZIndexes.cars};
`;

export const Car: React.FC<CarConfigureType> = ({ carStyle }) => {
  const { animDuration, animationTimingFunction, animationName } = carStyle;
  return (
    <CarBlock
      animationName={animationName}
      animationTimingFunction={animationTimingFunction}
      animDuration={animDuration}
    />
  );
};
