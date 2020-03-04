import React from 'react';
import { LazyImage } from '@tsareff/lazy-image';
import styled from 'styled-components';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

const MapFragmentWrapper = styled.div`
  display: flex;
`;

export const MapFragment: React.FC<IMapFragment> = ({
  roadImg,
  treeImg,
  style,
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
}
