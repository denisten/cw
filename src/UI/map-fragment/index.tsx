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
}) => {
  const treeWrapperStyle = {
    ...style,
    position: 'absolute',
    zIndex: ZIndexes.DECORATION,
  } as React.CSSProperties;
  return (
    <MapFragmentWrapper>
      <LazyImage src={roadImg} style={style} />
      {treeImg ? <LazyImage src={treeImg} style={treeWrapperStyle} /> : null}
      {bannerImg ? <Banners src={bannerImg} style={treeWrapperStyle} /> : null}
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
}
