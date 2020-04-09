import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { cloudsConfig } from './clouds-config';
import background from './background.png';

const PreloaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: gray;
  z-index: ${ZIndexes.PRELOADER};
  display: flex;
  overflow: hidden;
  background: url(${background}) no-repeat center;
  background-size: 100% 100%;
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
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-name: ${cloudMove};
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  z-index: ${props => props.zIndex || 1};
`;

export const Preloader: React.FC = () => {
  return (
    <PreloaderWrapper>
      {cloudsConfig.map(cloud => (
        <Cloud key={cloud.keyId} {...cloud} />
      ))}
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
