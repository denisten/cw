import React, { useEffect, useState } from 'react';
import styled, { keyframes, Keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { cloudsConfig } from './clouds-config';
import background from './background.png';
import { MTSSans } from '../../fonts';
import { useLoadingIndication } from '../../hooks/useLoadingIndication';
import { setLoaded } from '../../effector/app-condition/events';
import { preloaderBuildingsConfig } from './preloader-building-config';
import { PreloaderBuilding } from './preloader-building';
import animLogo from './anim_logo.png';
import { Sprite } from '../sprite';

const maxpercent = 100;
const delayBeforePreloaderOff = 500;

enum InheritZIndexes {
  BUILDINGS = 2,
  CLOUDS = 3,
  LOADLINE = 4,
  LOGO = 5,
}

enum PreloaderStages {
  LOGO_DISABLE = 25,
  CLOUDS_DISABLE = 90,
}

const PreloaderWrapper = styled.div<{ disable: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: ${ZIndexes.PRELOADER};
  display: ${props => (props.disable ? 'none' : 'flex')};
  overflow: hidden;
  background: url(${background}) no-repeat center;
  background-size: 100% 100%;
  align-items: flex-end;
  justify-content: center;
`;

const cloudMove = keyframes`
from {
    transform: translate3d(0%, 0, 0);
}
to {
    transform: translate3d(10%, 0, 0);
}
`;

const Cloud = styled.img<ICloud>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  animation-duration: ${props => props.animDuration || '5s'};
  animation-direction: ${props => props.animDirection || 'alternate'};
  animation-iteration-count: infinite;
  animation-name: ${cloudMove};
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  z-index: ${InheritZIndexes.CLOUDS};

  &.hideCloud {
    animation: ${props => props.endAnimation} 2s;
    animation-fill-mode: forwards;
  }
`;

const LoadingLine = styled.div<{ persentOfLoad?: number }>`
  width: 659px;
  height: 23px;
  box-shadow: inset 0 1px 4px 0 #202d3d, inset -1px 0 4px 0 #202d3d;
  background-color: #233742;
  z-index: ${InheritZIndexes.LOADLINE};
  transform: skew(-30deg);
  margin-bottom: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    text-shadow: 1px 1px 0 #233742;
    font-family: ${MTSSans.ULTRA_WIDE};
    font-size: 20px;
    line-height: 2;
    letter-spacing: -0.31px;
    color: #ffffff;
    transform: skew(30deg);
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.persentOfLoad}%;
    box-shadow: inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
    background-image: linear-gradient(
      to bottom,
      #bfdcff 1%,
      #8bd2ff 38%,
      #7ec7ff 53%,
      #8ad1ff 99%
    );
    z-index: 1;
  }
`;

const spriteStyle = {
  canvasWidth: 224,
  canvasHeight: 304,
  numberOfFramesX: 6,
  numberOfFramesY: 5,
  ticksPerFrame: 1,
  infinity: false,

  style: {
    width: '780px',
    height: '730px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: InheritZIndexes.LOGO,
  } as React.CSSProperties,
};

export const Preloader: React.FC = () => {
  const { loadingPercent } = useLoadingIndication();

  const [disable, setDisable] = useState(false);
  const [cloudsOff, setCloudsOff] = useState(false);
  const [animationStartFlag, setAnimationStartFlag] = useState(false);
  const [firstStepAnimationEnd, setFirstStepAnimationEnd] = useState(false);
  const [secondStepAnimationEnd, setSecondStepAnimationEnd] = useState(false);
  useEffect(() => {
    if (loadingPercent >= maxpercent && secondStepAnimationEnd) {
      setLoaded();
      setTimeout(() => {
        setDisable(true);
      }, delayBeforePreloaderOff);
    }

    if (loadingPercent >= PreloaderStages.CLOUDS_DISABLE) {
      setCloudsOff(true);
    }
  }, [loadingPercent, secondStepAnimationEnd]);

  const animationEnd = () => {
    setAnimationStartFlag(true);
  };

  return (
    <PreloaderWrapper disable={disable}>
      {preloaderBuildingsConfig.map((building, ind) => (
        <PreloaderBuilding
          imgs={building.imgs}
          firstStepAnimationEnd={firstStepAnimationEnd}
          onAnimationEndFirstCallback={setFirstStepAnimationEnd}
          onAnimationEndSecondCallback={setSecondStepAnimationEnd}
          secondStepAnimationEnd={secondStepAnimationEnd}
          animationStartFlag={animationStartFlag}
          {...building}
          key={ind}
        />
      ))}
      <Sprite img={animLogo} {...spriteStyle} onAnimationEnd={animationEnd} />
      {cloudsConfig.map(cloud => (
        <Cloud
          key={cloud.keyId}
          {...cloud}
          src={cloud.background}
          alt="cloud"
          className={'cloud ' + (cloudsOff ? 'hideCloud' : '')}
        />
      ))}

      <LoadingLine persentOfLoad={loadingPercent}>
        <span>{loadingPercent}%</span>
      </LoadingLine>
    </PreloaderWrapper>
  );
};

export interface ICloud {
  keyId?: number;
  width?: string;
  height?: string;
  background?: string;
  animDuration?: string;
  animDirection?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
  endAnimation?: Keyframes;
}
