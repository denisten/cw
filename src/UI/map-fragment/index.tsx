import React from 'react';
import { LazyImage } from '@tsareff/lazy-image';
import styled from 'styled-components';

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
  } as React.CSSProperties;
  return (
    <MapFragmentWrapper>
      <LazyImage src={roadImg} style={style} />
      {treeImg ? <LazyImage src={treeImg} style={treeWrapperStyle} /> : null}
    </MapFragmentWrapper>
  );
};
