import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { cloudsConfig } from './clouds-config';
import background from './background.jpg';
import { MTSSans } from '../../fonts';
import { useLoadingIndication } from '../../hooks/useLoadingIndication';

const maxpercent = 100;
const delayBeforePreloaderOff = 1000;

const cloudsOddOff = keyframes`
to {
  transform: translate3d(-100%, -100%, 0);
  opacity: .2;
}
`;
const cloudsEvenOff = keyframes`
to {
  transform: translate3d(100%, 100%, 0);
  opacity: .2;
}
`;

const PreloaderWrapper = styled.div<{ disable: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: gray;
  z-index: ${ZIndexes.PRELOADER};
  display: ${props => (props.disable ? 'none' : 'flex')};
  overflow: hidden;
  background: url(${background}) no-repeat center;
  background-size: 100% 100%;
  align-items: flex-end;
  justify-content: center;

  .cloud:nth-child(odd).hideCloud {
    animation: ${cloudsOddOff} 1s;
    animation-fill-mode: forwards;
  }
  .cloud:nth-child(even).hideCloud {
    animation: ${cloudsEvenOff} 1s;
    animation-fill-mode: forwards;
  }
`;

const cloudMove = keyframes`
from {
    transform: translate3d(0%, 0, 0);
}
to {
    transform: translate3d(20%, 0, 0);
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
  z-index: ${props => props.zIndex || 1};
`;

const LoadingLine = styled.div<{ persentOfLoad?: number }>`
  width: 659px;
  height: 23px;
  box-shadow: inset 0 1px 4px 0 #202d3d, inset -1px 0 4px 0 #202d3d;
  background-color: #233742;
  z-index: 3;
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

export const Preloader: React.FC = () => {
  const { allResoursesLoaded, loadingPercent } = useLoadingIndication();

  const [disable, setDisable] = useState(false);
  const [cloudsOff, setCloudsOff] = useState(false);
  useEffect(() => {
    if (loadingPercent === maxpercent || allResoursesLoaded) {
      setCloudsOff(true);
      setTimeout(() => {
        setDisable(true);
      }, delayBeforePreloaderOff);
    }
  }, [loadingPercent, allResoursesLoaded]);
  return (
    <PreloaderWrapper disable={disable}>
      {cloudsConfig.map(cloud => (
        <Cloud
          key={cloud.keyId}
          {...cloud}
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
}
