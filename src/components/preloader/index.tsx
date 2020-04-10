import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { cloudsConfig } from './clouds-config';
import background from './background.jpg';
import { MTSSans } from '../../fonts';
import { useImageLoading } from '../../hooks/useImageLoading';

const maxpercent = 100;
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

const LoadingLine = styled.div<{ persentOfLoad?: string }>`
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
  }
`;

export const Preloader: React.FC = () => {
  const { allImageCount, loadedImgCount, haveNotImg } = useImageLoading();
  const translateToPercent = () => {
    const persent = (loadedImgCount * maxpercent) / allImageCount;
    if (persent) {
      return persent.toFixed(0);
    }
  };
  // console.log(allImageCount, loadedImgCount);
  return (
    <PreloaderWrapper
      disable={
        // (allImageCount !== 0 && allImageCount === loadedImgCount) || haveNotImg
        false
      }
    >
      {cloudsConfig.map(cloud => (
        <Cloud key={cloud.keyId} {...cloud} />
      ))}
      <LoadingLine persentOfLoad={translateToPercent()}>
        <span>{translateToPercent() || 0}%</span>
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
