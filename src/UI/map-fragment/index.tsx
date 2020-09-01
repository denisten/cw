import React from 'react';
import { LazyImage } from '@tsareff/lazy-image';
import styled, { keyframes } from 'styled-components';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { useStore } from 'effector-react';
import { AppConditionStore } from '../../effector/app-condition/store';
import { FRRImg } from '../../components/first-render-require-img';

const flyingAnim = keyframes`
  to {
    transform: translateY(-0.7%);
  }
`;

const MapFragmentWrapper = styled.div`
  display: flex;
`;

const Banners = styled(LazyImage)<IBanners>`
  animation-name: ${flyingAnim};
  animation-duration: 1.4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  animation-play-state: ${props => (props.animationOff ? 'paused' : 'running')};
`;
const lazyImageWrapperStyle = {
  position: 'absolute',
  zIndex: ZIndexes.DECORATION,
} as React.CSSProperties;
const lazyBannerStyle = {
  ...lazyImageWrapperStyle,
  zIndex: ZIndexes.BANNERS,
};

export const MapFragment: React.FC<IMapFragment> = ({
  roadImg,
  treeImg,
  bannerImg,
  decorationImg,
}) => {
  const { animationOff } = useStore(AppConditionStore);
  const Trees = treeImg ? (
    <FRRImg src={treeImg} style={lazyImageWrapperStyle} />
  ) : null;

  const Banner = bannerImg ? (
    <Banners
      src={bannerImg}
      style={lazyBannerStyle}
      animationOff={animationOff}
    />
  ) : null;

  const Decoration = decorationImg ? (
    <FRRImg src={decorationImg} style={lazyImageWrapperStyle} />
  ) : null;
  return (
    <MapFragmentWrapper>
      <FRRImg src={roadImg} />
      {Trees}
      {Banner}
      {Decoration}
    </MapFragmentWrapper>
  );
};

interface IMapFragment {
  roadImg: string;
  treeImg?: string;
  bannerImg?: string;
  decorationImg?: string;
}

interface IBanners {
  animationOff: boolean;
}
