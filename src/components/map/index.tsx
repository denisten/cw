import React from 'react';
import styled from 'styled-components';
import { LazyImage } from '@tsareff/lazy-image';
import map11 from '../../img/map/1.1.png';
import map12 from '../../img/map/1.2.png';
import map13 from '../../img/map/1.3.png';
import map21 from '../../img/map/2.1.png';
import map22 from '../../img/map/2.2.png';
import map23 from '../../img/map/2.3.png';
import map31 from '../../img/map/3.1.png';
import map32 from '../../img/map/3.2.png';
import map33 from '../../img/map/3.3.png';
import './style.css';

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Map = () => {
  return (
    <MapWrapper>
      <LazyImage src={map11} className="img-wrapper p21" />
      <LazyImage src={map12} className="img-wrapper p32" />
      <LazyImage src={map13} className="img-wrapper p21" />
      <LazyImage src={map21} className="img-wrapper p21" />
      <LazyImage src={map22} className="img-wrapper p32" />
      <LazyImage src={map23} className="img-wrapper p21" />
      <LazyImage src={map31} className="img-wrapper p21" />
      <LazyImage src={map32} className="img-wrapper p32" />
      <LazyImage src={map33} className="img-wrapper p21" />
    </MapWrapper>
  );
};
