import React from 'react';
import { LazyImage } from '@tsareff/lazy-image';
import styled from 'styled-components';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

const MapFragmentWrapper = styled.div`
  display: flex;
`;

type MapFragmentCSSProps = {
  width: string;
  height: string;
};
interface MapFragmentProps {
  roadImg: string;
  treeImg?: string;
  style: MapFragmentCSSProps;
}

export const MapFragment: React.FC<MapFragmentProps> = ({
  roadImg,
  treeImg,
  style,
}) => {
  const treeWrapperStyle = {
    ...style,
    position: 'absolute',
    zIndex: ZIndexes.decoration,
  } as React.CSSProperties;
  return (
    <MapFragmentWrapper>
      <LazyImage src={roadImg} style={style} />
      {treeImg ? <LazyImage src={treeImg} style={treeWrapperStyle} /> : null}
    </MapFragmentWrapper>
  );
};
