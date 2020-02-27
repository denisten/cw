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

const CarBlock = styled.div<{ flag: boolean }>`
  width: 57px;
  height: 50px;
  position: absolute;
  background-size: 100% 100%;
  animation-duration: 5s;
  animation-timing-function: ease-in-out;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-name: ${props => (props.flag ? animationStart : animationEnd)};
`;

export const Car = () => {
  const [animFlag, setAnimFlag] = useState(false);
  return (
    <CarBlock flag={animFlag} onAnimationEnd={() => setAnimFlag(!animFlag)} />
  );
};
