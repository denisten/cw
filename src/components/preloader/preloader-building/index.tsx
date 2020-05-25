/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const growAnim = keyframes`
        0%   { transform: scale(1,1)    translateY(0); }
        10%  { transform: scale(1.1,.9) translateY(0); }
        30%  { transform: scale(.9,1.1) translateY(0px); }
        50%  { transform: scale(1.1,1.2)    translateY(0); }
        100% { transform: scale(1,1)    translateY(0);}
`;

const BuildingsBG = styled.img<{
  firstStepAnimationEnd?: boolean;
  secondStepAnimationEnd?: boolean;
  animationStartFlag?: boolean;
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform-origin: bottom;
  &.stepOne {
    animation: ${props => (props.animationStartFlag ? growAnim : '')} 0.5s both;
    opacity: ${props => (props.firstStepAnimationEnd ? 0 : 1)};
  }
  &.stepTwo {
    opacity: ${props =>
      props.firstStepAnimationEnd && !props.secondStepAnimationEnd ? 1 : 0};
    animation: ${props =>
        props.firstStepAnimationEnd && props.animationStartFlag ? growAnim : ''}
      0.5s both;
  }
  &.stepThree {
    opacity: ${props => (props.secondStepAnimationEnd ? 1 : 0)};
  }
`;

const BuildingWrapper = styled.div<IBuildingWrapper>`
  position: absolute;
  z-index: 2;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.width};
  height: ${props => props.height};
`;

export const PreloaderBuilding: React.FC<IPreloaderBuilding> = ({
  imgs = ['', '', ''],
  firstStepAnimationEnd,
  onAnimationEndFirstCallback,
  onAnimationEndSecondCallback,
  loadingPercent,
  secondStepAnimationEnd,
  ...styles
}) => {
  return (
    <BuildingWrapper {...styles}>
      <BuildingsBG
        src={imgs[0]}
        alt="building"
        className="stepOne"
        firstStepAnimationEnd={firstStepAnimationEnd}
        onAnimationEnd={() => onAnimationEndFirstCallback(true)}
        animationStartFlag={loadingPercent >= 33}
      />
      <BuildingsBG
        src={imgs[1]}
        alt="building"
        className="stepTwo"
        firstStepAnimationEnd={firstStepAnimationEnd}
        secondStepAnimationEnd={secondStepAnimationEnd}
        onAnimationEnd={() => onAnimationEndSecondCallback(true)}
        animationStartFlag={loadingPercent >= 66}
      />
      <BuildingsBG
        src={imgs[2]}
        alt="building"
        className="stepThree"
        secondStepAnimationEnd={secondStepAnimationEnd}
      />
    </BuildingWrapper>
  );
};

export interface IBuildingWrapper {
  width: string;
  height: string;
  top: string;
  left: string;
  imgs?: string[];
}

interface IPreloaderBuilding extends IBuildingWrapper {
  firstStepAnimationEnd: boolean;
  onAnimationEndFirstCallback: (arg: boolean) => void;
  onAnimationEndSecondCallback: (arg: boolean) => void;
  loadingPercent: number;
  secondStepAnimationEnd: boolean;
}
