import React from 'react';
import { LazyImage } from '@tsareff/lazy-image';
import styled, { keyframes } from 'styled-components';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

const flyingAnim = keyframes`
  to {
    transform: translateY(0.3%);
  }
`;

const MapFragmentWrapper = styled.div`
  display: flex;
`;

const Banners = styled(LazyImage)`
  animation-name: ${flyingAnim};
  animation-duration: 1.4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-direction: alternate;
`;

export const MapFragment: React.FC<IMapFragment> = ({
  roadImg,
  treeImg,
  style,
  bannerImg,
  decorationImg,
}) => {
  const lazyImageWrapperStyle = {
    ...style,
    position: 'absolute',
    zIndex: ZIndexes.DECORATION,
  } as React.CSSProperties;
  const lazyBannerStyle = {
    ...lazyImageWrapperStyle,
    zIndex: ZIndexes.BANNERS,
  };
  return (
    <MapFragmentWrapper>
      <LazyImage src={roadImg} style={style} />
      {treeImg ? (
        <LazyImage src={treeImg} style={lazyImageWrapperStyle} />
      ) : null}
      {bannerImg ? <Banners src={bannerImg} style={lazyBannerStyle} /> : null}
      {decorationImg ? (
        <LazyImage src={decorationImg} style={lazyImageWrapperStyle} />
      ) : null}
    </MapFragmentWrapper>
  );
};

interface IMapFragmentCSS {
  width: string;
  height: string;
}
interface IMapFragment {
  roadImg: string;
  treeImg?: string;
  style: IMapFragmentCSS;
  bannerImg?: string;
  decorationImg?: string;
}
