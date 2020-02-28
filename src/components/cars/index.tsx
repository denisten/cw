import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import toLeftBg from './toRight.png';
import toRightBg from './toLeft.png';
const animationStart = keyframes`
0% {
  left: 25.3%;
  top: 45.6%;
   background: url(${toRightBg}) no-repeat center;
}
99% {
background: url(${toRightBg}) no-repeat center;
}
100% {
  left: 35.8%;
  top: 38.1%;
   background: url(${toLeftBg}) no-repeat center;
}
`;

const animationEnd = keyframes`
0% {
  left: 35.8%;
  top: 38.1%;
   background: url(${toLeftBg}) no-repeat center;
}
99% {
background: url(${toLeftBg}) no-repeat center;
}
100% {
  left: 25.3%;
  top: 45.6%;
   background: url(${toRightBg}) no-repeat center;
}
`;

type CarProps = {
  flag?: boolean;
  animDuration?: string;
  animationTimingFunction?: string;
  animationDirection?: string;
  animationIterationCount?: number;
};

type CarConfigureType = {
  carStyle: CarProps;
};

const CarBlock = styled.div<CarProps>`
  width: 57px;
  height: 50px;
  position: absolute;
  background-size: 100% 100%;
  animation-duration: ${props => props.animDuration ||  '5s'};
  animation-timing-function: ${props => props.animationTimingFunction ||  'ease-in-out'};
  animation-direction: ${props => props.animationDirection ||  'normal'};
  animation-iteration-count: ${props => props.animationIterationCount ||  1};
  animation-name: ${props => (props.flag ? animationStart : animationEnd)};
`;


export const Car: React.FC<CarConfigureType>  = ({carStyle, }) => {
  const {
    animDuration,
    animationTimingFunction,
    animationDirection,
    animationIterationCount
  } = carStyle
  const [animFlag, setAnimFlag] = useState(false);
  return (
    <CarBlock
    flag={animFlag}
    animationTimingFunction={animationTimingFunction}
    animationDirection={animationDirection}
    animDuration = {animDuration}
    animationIterationCount={animationIterationCount}
    onAnimationEnd={() => setAnimFlag(!animFlag)} />
  );
};







