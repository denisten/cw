/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { useEffect, useState } from 'react';
import styled, { keyframes, Keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { cloudsConfig } from './clouds-config';
import background from './background.png';
import { MTSSans } from '../../fonts';
import { useLoadingIndication } from '../../hooks/useLoadingIndication';
import { setLoaded } from '../../effector/app-condition/events';
import building0 from './buildings_0.png';
import building1 from './buildings_1.png';
import building2 from './buildings_2.png';
import building3 from './buildings_3.png';
import building4 from './buildings_4.png';
import building5 from './buildings_5.png';
import building6 from './buildings_6.png';
import building7 from './buildings_7.png';
import building8 from './buildings_8.png';
import logo from './logo.png';

const maxpercent = 100;
const delayBeforePreloaderOff = 1000;

enum InheritZIndexes {
  BUILDINGS = 2,
  CLOUDS = 3,
  LOADLINE = 4,
  LOGO = 5,
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
    animation: ${props => props.endAnimation} 3s;
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

const fadeLogo = keyframes`
from {
  opacity: 1;
}

to {
  opacity: 0;
}
`;

const Logo = styled.img<{ displayFlag: boolean }>`
  position: absolute;
  width: 1001px;
  height: 751px;
  z-index: ${InheritZIndexes.LOGO};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${props => (props.displayFlag ? fadeLogo : '')} 0.5s linear both;
`;

const BuildingsBG = styled.img<{ displayFlag: boolean }>`
  position: absolute;
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  left: 0;
  top: 0;
  z-index: ${InheritZIndexes.BUILDINGS};
  width: 100%;
  height: 100%;
  opacity: ${props => (props.displayFlag ? 1 : 0)};
  transition: 0.1s;
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

    if (loadingPercent >= 90) {
      setCloudsOff(true);
    }
  }, [loadingPercent]);
  return (
    <PreloaderWrapper disable={disable}>
      {/* <Logo displayFlag={loadingPercent >= 25} src={logo} alt="logo" /> */}
      {cloudsConfig.map(cloud => (
        <Cloud
          key={cloud.keyId}
          {...cloud}
          src={cloud.background}
          alt="cloud"
          className={'cloud ' + (cloudsOff ? 'hideCloud' : '')}
        />
      ))}
      <BuildingsBG
        displayFlag={!loadingPercent || loadingPercent < 12.5}
        src={building0}
        alt="building"
      />
      <BuildingsBG
        displayFlag={loadingPercent >= 9 && loadingPercent < 25}
        src={building1}
        alt="building"
      />
      <BuildingsBG
        displayFlag={loadingPercent >= 21.5 && loadingPercent < 37.5}
        src={building2}
        alt="building"
      />
      <BuildingsBG
        displayFlag={loadingPercent >= 34 && loadingPercent < 50}
        src={building3}
        alt="building"
      />
      <BuildingsBG
        displayFlag={loadingPercent >= 46.5 && loadingPercent < 62.5}
        src={building4}
        alt="building"
      />
      {/* <BuildingsBG
        displayFlag={loadingPercent >= 59 && loadingPercent < 75}
        src={building5}
        alt="building"
      /> */}
      <BuildingsBG
        displayFlag={loadingPercent >= 59 && loadingPercent < 75}
        src={building6}
        alt="building"
      />
      <BuildingsBG
        displayFlag={loadingPercent >= 71.5 && loadingPercent < 87.5}
        src={building7}
        alt="building"
      />
      <BuildingsBG
        displayFlag={loadingPercent >= 84 && loadingPercent < 100}
        src={building8}
        alt="building"
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
  endAnimation?: Keyframes;
}
