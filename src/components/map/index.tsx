import React from 'react';
import styled from 'styled-components';
import map11 from '../../img/map/1.1.png';
import map12 from '../../img/map/1.2.png';
import map13 from '../../img/map/1.3.png';
import map21 from '../../img/map/2.1.png';
import map22 from '../../img/map/2.2.png';
import map23 from '../../img/map/2.3.png';
import map31 from '../../img/map/3.1.png';
import map32 from '../../img/map/3.2.png';
import map33 from '../../img/map/3.3.png';
import { LazyImage } from '@tsareff/lazy-image';

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const styleConfig: StyleConfigTypes = {
  img11: {
    width: '1920px',
    height: '1080px',
  },
  img12: {
    width: '3840px',
    height: '1080px',
  },
  img13: {
    width: '1920px',
    height: '1080px',
  },
  img21: {
    width: '1920px',
    height: '2160px',
  },
  img22: {
    width: '3840px',
    height: '2160px',
  },
  img23: {
    width: '1920px',
    height: '2160px',
  },
};
type StyleConfigTypes = Record<string, DivStyleType>;
type DivStyleType = {
  width: string;
  height: string;
};

export const Map: React.FC = () => {
  return (
    <MapWrapper>
      <LazyImage src={map11} style={styleConfig.img11} />
      <LazyImage src={map12} style={styleConfig.img12} />
      <LazyImage src={map13} style={styleConfig.img13} />
      <LazyImage src={map21} style={styleConfig.img21} />
      <LazyImage src={map22} style={styleConfig.img22} />
      <LazyImage src={map23} style={styleConfig.img23} />
      <LazyImage src={map31} style={styleConfig.img21} />
      <LazyImage src={map32} style={styleConfig.img22} />
      <LazyImage src={map33} style={styleConfig.img23} />
    </MapWrapper>
  );
};
