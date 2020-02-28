import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

type CarProps = {
  flag?: boolean;
  animDuration?: string;
  animationTimingFunction?: string;
  animationDirection?: string;
  animationIterationCount?: number;
};

type CarConfigureType = {
  carStyle: CarProps;
  animationStartParams: string;
  animationEndParams: string;
};



export const Car: React.FC<CarConfigureType>  = ({carStyle, animationStartParams, animationEndParams}) => {
  const {
    animDuration,
    animationTimingFunction,
    animationDirection,
    animationIterationCount
  } = carStyle
  const [animFlag, setAnimFlag] = useState(false);
  const animationStart = keyframes`${animationStartParams}`;
  const animationEnd = keyframes`${animationEndParams}`
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
    /* left: 0%;
    right: 0%;
    background: red; */
`;


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







