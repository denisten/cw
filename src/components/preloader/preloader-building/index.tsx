import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

enum AnimationSteps {
  ONE = 'stepOne',
  TWO = 'stepTwo',
  THREE = 'stepThree',
}

const growAnim = keyframes`
        0%   { transform: scaleY(1)    translateY(0); }
        50%  { transform: scaleY(.9) translateY(0px); }
        100% { transform: scaleY(1.1)    translateY(0);}
`;

const finallyAnim = keyframes`
        0%   { transform: scaleY(1)    translateY(0); }
        50%  { transform: scaleY(.9) translateY(0px); }
        100%  { transform: scaleY(1)    translateY(0); }
`;

const BuildingsBG = styled.img<{
  firstStepAnimationEnd?: boolean;
  secondStepAnimationEnd?: boolean;
  animationStartFlag?: boolean;
  delay?: string;
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform-origin: bottom;
  &.${AnimationSteps.ONE} {
    animation: ${props => (props.animationStartFlag ? growAnim : '')} 0.2s both;
    animation-delay: ${props => props.delay || '0s'};
    opacity: ${props => (props.firstStepAnimationEnd ? 0 : 1)};
  }
  &.${AnimationSteps.TWO} {
    opacity: ${props =>
      props.firstStepAnimationEnd && !props.secondStepAnimationEnd ? 1 : 0};
    animation: ${props =>
        props.firstStepAnimationEnd && props.animationStartFlag ? growAnim : ''}
      0.2s both;
  }
  &.${AnimationSteps.THREE} {
    opacity: ${props => (props.secondStepAnimationEnd ? 1 : 0)};
    animation: ${props => (props.secondStepAnimationEnd ? finallyAnim : '')}
      0.2s both;
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
  imgs = ['', '', ''],
  animationStartFlag,
  onAnimationEndCallback,
  ...styles
}) => {
  const [firstStepAnim, setFirstStepAnim] = useState(false);
  const [secondStepAnim, setSecondStepAnim] = useState(false);
  return (
    <BuildingWrapper {...styles}>
      <BuildingsBG
        src={imgs[0]}
        alt="building"
        className={AnimationSteps.ONE}
        firstStepAnimationEnd={firstStepAnim}
        onAnimationEnd={() => setFirstStepAnim(true)}
        animationStartFlag={animationStartFlag}
        {...styles}
      />
      <BuildingsBG
        src={imgs[1]}
        alt="building"
        className={AnimationSteps.TWO}
        firstStepAnimationEnd={firstStepAnim}
        secondStepAnimationEnd={secondStepAnim}
        onAnimationEnd={() => setSecondStepAnim(true)}
        animationStartFlag={animationStartFlag}
        {...styles}
      />
      <BuildingsBG
        src={imgs[2]}
        alt="building"
        className={AnimationSteps.THREE}
        secondStepAnimationEnd={secondStepAnim}
        onAnimationEnd={() => {
          styles.lastBuilding && onAnimationEndCallback(true);
        }}
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
  imgs?: string[];
  delay?: string;
  lastBuilding?: boolean;
}

interface IPreloaderBuilding extends IBuildingWrapper {
  onAnimationEndCallback: (arg: boolean) => void;
  animationStartFlag: boolean;
}
