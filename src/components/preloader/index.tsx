/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { cloudsConfig } from './clouds-config';
import background from './background.png';
import { MTSSans } from '../../fonts';
import { useLoadingIndication } from '../../hooks/useLoadingIndication';
import { setLoaded } from '../../effector/app-condition/events';
import buildingZero from './buildings_0.png';
import buildingOne from './buildings_1.png';
import buildingTwo from './buildings_2.png';
import logo from './logo.png';

const maxpercent = 100;
const delayBeforePreloaderOff = 1000;

enum InheritZIndexes {
  BUILDINGS = 2,
  CLOUDS = 3,
  LOADLINE = 4,
  LOGO = 5,
}

const cloudsOddOff = keyframes`
to {
  transform: translate3d(-100%, -100%, 0);
  opacity: 0;
}
`;
const cloudsEvenOff = keyframes`
to {
  transform: translate3d(100%, 100%, 0);
  opacity: 0;
}
`;

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

  .cloud:nth-child(odd).hideCloud {
    animation: ${cloudsOddOff} 1.5s;
    animation-fill-mode: forwards;
  }
  .cloud:nth-child(even).hideCloud {
    animation: ${cloudsEvenOff} 1.5s;
    animation-fill-mode: forwards;
  }
`;

const cloudMove = keyframes`
from {
    transform: translate3d(0%, 0, 0);
}
to {
    transform: translate3d(10%, 0, 0);
}
`;

const Cloud = styled.div<ICloud>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  background: url(${props => props.background}) no-repeat center;
  background-size: 100% 100%;
  animation-duration: ${props => props.animDuration || '5s'};
  animation-direction: ${props => props.animDirection || 'alternate'};
  animation-iteration-count: infinite;
  animation-name: ${cloudMove};
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  z-index: ${InheritZIndexes.CLOUDS};
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

const fadeLogo = keyframes`
from {
  opacity: 1;
}

to {
  opacity: 0;
}
`;

const Logo = styled.div<{ displayFlag: boolean }>`
  position: absolute;
  width: 1001px;
  height: 751px;
  z-index: ${InheritZIndexes.LOGO};
  background: url(${logo}) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${props => (props.displayFlag ? fadeLogo : '')} 0.3s linear both;
`;

const BuildingsBG = styled.div<{ displayFlag: boolean; background: string }>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: ${InheritZIndexes.BUILDINGS};
  width: 100%;
  height: 100%;
  background: url(${props => props.background}) no-repeat center;
  background-size: 100% 100%;
  opacity: ${props => (props.displayFlag ? 1 : 0)};
`;

export const Preloader: React.FC = () => {
  const { loadingPercent } = useLoadingIndication();

  const [disable, setDisable] = useState(false);
  const [cloudsOff, setCloudsOff] = useState(false);
  useEffect(() => {
    if (loadingPercent >= maxpercent) {
      setLoaded();
      setTimeout(() => {
        setDisable(true);
      }, delayBeforePreloaderOff);
    }

    if (loadingPercent > 50) {
      setCloudsOff(true);
    }
  }, [loadingPercent]);
  return (
    <PreloaderWrapper disable={disable}>
      <Logo displayFlag={loadingPercent >= 25} />
      {cloudsConfig.map(cloud => (
        <Cloud
          key={cloud.keyId}
          {...cloud}
          className={'cloud ' + (cloudsOff ? 'hideCloud' : '')}
        />
      ))}
      <BuildingsBG
        displayFlag={!loadingPercent || loadingPercent < 33}
        background={buildingZero}
      />
      <BuildingsBG
        displayFlag={loadingPercent >= 33 && loadingPercent < 66}
        background={buildingOne}
      />
      <BuildingsBG
        displayFlag={loadingPercent >= 66}
        background={buildingTwo}
      />
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
}
