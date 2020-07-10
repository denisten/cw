import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { preloaderTowersAnimationDuration } from '../../../constants';

enum AnimationSteps {
  INIT = 'init',
  ONE = 'stepOne',
  TWO = 'stepTwo',
  THREE = 'stepThree',
}

const growAnim = keyframes`
        0%   { transform: scaleY(1)    translateY(0);}
        50%  { transform: scaleY(.9) translateY(0); }
        100% { transform: scaleY(1.1)    translateY(0);}
`;

const finallyAnim = keyframes`
        0%   { transform: scaleY(1)    translateY(0);}
        50%  { transform: scaleY(.9) translateY(0);}
        100%  { transform: scaleY(1)    translateY(0);}
`;

const BuildingPreloaderAnimationStep = styled.img<
  IBuildingPreloaderAnimationStep
>`
  position: absolute;
  opacity: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform-origin: bottom;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
  animation-duration: ${preloaderTowersAnimationDuration}ms;
  animation-fill-mode: both;
  &.${AnimationSteps.INIT} {
    opacity: 1;
  }
  &.${AnimationSteps.ONE} {
    opacity: 1;
    animation-name: ${growAnim};
    animation-delay: ${props => props.delay || '0s'};
  }
  &.${AnimationSteps.TWO} {
    opacity: 1;
    animation-name: ${growAnim};
    animation-delay: 100ms;
  }
  &.${AnimationSteps.THREE} {
    opacity: 1;
    animation-name: ${finallyAnim};
    animation-delay: 100ms;
  }
`;

const BuildingWrapper = styled.div<IBuildingWrapper>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.width};
  height: ${props => props.height};
`;

export const PreloaderBuilding: React.FC<IPreloaderBuilding> = ({
  imgArray = ['', '', ''],
  animationStartFlag,
  onAnimationEndCallback,
  ...styles
}) => {
  const ref0 = useRef<HTMLImageElement>(null);
  const ref1 = useRef<HTMLImageElement>(null);
  const ref2 = useRef<HTMLImageElement>(null);

  const initAnimation = () => {
    requestAnimationFrame(() => {
      if (ref0.current && animationStartFlag) {
        ref0.current.classList.add(AnimationSteps.ONE);
      }
    });
  };

  const handleFirstStepAnimationEnd = () => {
    requestAnimationFrame(() => {
      if (ref1.current && ref0.current) {
        ref0.current.classList.remove(AnimationSteps.ONE);
        ref1.current.classList.add(AnimationSteps.TWO);
      }
    });
  };
  const handleSecondStepAnimationEnd = () => {
    requestAnimationFrame(() => {
      if (ref2.current && ref1.current) {
        ref1.current.classList.remove(AnimationSteps.TWO);
        ref2.current.classList.add(AnimationSteps.THREE);
      }
    });
  };

  const handleThirdStepAnimationEnd = () =>
    styles.lastBuilding && onAnimationEndCallback();

  useEffect(initAnimation, [animationStartFlag]);

  return (
    <BuildingWrapper {...styles}>
      <BuildingPreloaderAnimationStep
        ref={ref0}
        src={imgArray[0]}
        alt="building"
        className={AnimationSteps.INIT}
        onAnimationEnd={handleFirstStepAnimationEnd}
        {...styles}
      />
      <BuildingPreloaderAnimationStep
        ref={ref1}
        src={imgArray[1]}
        alt="building"
        onAnimationEnd={handleSecondStepAnimationEnd}
        {...styles}
      />
      <BuildingPreloaderAnimationStep
        ref={ref2}
        src={imgArray[2]}
        alt="building"
        onAnimationEnd={handleThirdStepAnimationEnd}
        {...styles}
      />
    </BuildingWrapper>
  );
};

export interface IBuildingWrapper {
  width: string;
  height: string;
  top: string;
  left: string;
  imgArray?: string[];
  delay?: string;
  lastBuilding?: boolean;
}

interface IPreloaderBuilding extends IBuildingWrapper {
  onAnimationEndCallback: () => void;
  animationStartFlag: boolean;
}
interface IBuildingPreloaderAnimationStep {
  delay?: string;
}
