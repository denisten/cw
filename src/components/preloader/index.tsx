import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, Keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { cloudsConfig } from './clouds-config';
import background from './background.jpg';
import { MTSSans } from '../../fonts';
import { useCalculateLoadingProgress } from '../../hooks/use-loading-indication';
import { setDOMLoaded } from '../../effector/app-condition/events';
import { preloaderBuildingsConfig } from './preloader-building-config';
import { PreloaderBuilding } from './preloader-building';
import { delayBeforePreloaderOff, maxPercent } from '../../constants';
import { Logo } from './logo';

enum InheritZIndexes {
  BUILDINGS = 2,
  CLOUDS = 3,
  LOAD_LINE = 4,
  LOGO = 5,
  FADEIN_BLOCK = 6,
}

const appearAnim = keyframes`
from {opacity: 0};
to {opacity: 1};
`;

const PreloaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: ${ZIndexes.PRELOADER};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &.disable {
    display: none;
  }
  &.active {
    animation: ${appearAnim} ${delayBeforePreloaderOff / 2}ms linear both
      reverse;
  }
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    z-index: ${InheritZIndexes.FADEIN_BLOCK};
    opacity: 0;
    animation: none;
    &.appearing {
      animation: ${appearAnim} ${delayBeforePreloaderOff / 2}ms linear both;
    }
  }
`;

const BuildingWrapper = styled.div`
  z-index: ${InheritZIndexes.BUILDINGS};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(${background}) no-repeat center;
  background-size: 100% 100%;
  transition-duration: 1s;
  transform: scale(1);
  transition-timing-function: ease-in-out;
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
    animation: ${props => props.endAnimation} 1.5s;
    animation-fill-mode: forwards;
  }
`;

const LoadingLine = styled.div<ILoadingLine>`
  width: 659px;
  height: 23px;
  box-shadow: inset 0 1px 4px 0 #202d3d, inset -1px 0 4px 0 #202d3d;
  background-color: #233742;
  z-index: ${InheritZIndexes.LOAD_LINE};
  transform: skew(-30deg);
  margin-bottom: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 4px;
  position: absolute;
  bottom: 45px;

  span {
    text-shadow: 1px 1px 0 #233742;
    font-family: ${MTSSans.ULTRA_WIDE};
    font-size: 20px;
    line-height: 2;
    letter-spacing: -0.31px;
    color: #ffffff;
    transform: skew(30deg);
    z-index: 2;
    transition: 0.1s;
    margin-top: 4px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    box-shadow: inset 0 1px 3px 0 rgba(255, 255, 255, 0.5);
    background-color: #04b5d2;
    z-index: 1;
  }
`;

const spriteStyle = {
  canvasWidth: 700,
  canvasHeight: 730,
  numberOfFramesX: 6,
  numberOfFramesY: 6,
  ticksPerFrame: 1,
  infinity: false,

  style: {
    width: '780px',
    height: '694px',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: InheritZIndexes.LOGO,
  } as React.CSSProperties,
};

enum CloudsState {
  VISIBLE = 'cloud',
  HIDE = 'hideCloud',
}
export const Preloader: React.FC = () => {
  const loadingProgress = useCalculateLoadingProgress();
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const cloudClassName = useRef(CloudsState.VISIBLE);

  useEffect(() => {
    const request = requestAnimationFrame(() => {
      if (loadingProgress >= maxPercent && isAnimationEnded) {
        setDOMLoaded();
        preloaderRef.current?.classList.add('active');
        preloaderRef.current?.classList.remove('disable');
        setTimeout(() => {
          preloaderRef.current?.classList.remove('active');
          preloaderRef.current?.classList.add('disable');
        }, delayBeforePreloaderOff);
      }

      if (isAnimationStarted) {
        cloudClassName.current = CloudsState.HIDE;
        if (buildingRef.current) {
          buildingRef.current.style.transform = 'scale(1.07)';
        }
      }
    });
    return () => cancelAnimationFrame(request);
  }, [loadingProgress, isAnimationEnded, isAnimationStarted]);

  const onAnimationEnd = () => {
    setIsAnimationStarted(true);
  };

  return (
    <PreloaderWrapper ref={preloaderRef}>
      <BuildingWrapper
        ref={buildingRef}
        onTransitionEnd={() => setIsAnimationStarted(false)}
      >
        {preloaderBuildingsConfig.map((building, ind) => (
          <PreloaderBuilding
            imgArray={building.imgArray}
            animationStartFlag={isAnimationStarted}
            onAnimationEndCallback={() =>
              !isAnimationEnded && setIsAnimationEnded(true)
            }
            key={ind}
            {...building}
          />
        ))}
      </BuildingWrapper>
      <Logo onAnimationEnd={onAnimationEnd} />
      {cloudsConfig.map(cloud => (
        <Cloud
          {...cloud}
          className={cloudClassName.current}
          key={cloud.keyId}
          src={cloud.background}
          alt="cloud"
        />
      ))}

      <LoadingLine progress={loadingProgress}>
        <span>{loadingProgress}%</span>
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

interface ILoadingLine {
  progress: number;
}
