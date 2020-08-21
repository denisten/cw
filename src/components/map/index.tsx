import React from 'react';
import styled from 'styled-components';
import road11 from '../../img/roads/1.1.png';
import road12 from '../../img/roads/1.2.png';
import road13 from '../../img/roads/1.3.png';
import road14 from '../../img/roads/1.4.png';
import road21 from '../../img/roads/2.1.png';
import road22 from '../../img/roads/2.2.png';
import road23 from '../../img/roads/2.3.png';
import road24 from '../../img/roads/2.4.png';
import road31 from '../../img/roads/3.1.png';
import road32 from '../../img/roads/3.2.png';
import road33 from '../../img/roads/3.3.png';
import road34 from '../../img/roads/3.4.png';
import road41 from '../../img/roads/4.1.png';
import road42 from '../../img/roads/4.2.png';
import road43 from '../../img/roads/4.3.png';
import road44 from '../../img/roads/4.4.png';
import { MapFragment } from '../../UI/map-fragment';
import tree22 from '../../img/trees/2.2.png';
import tree23 from '../../img/trees/2.3.png';
import tree32 from '../../img/trees/3.2.png';
import tree33 from '../../img/trees/3.3.png';
import decor22 from '../../img/decorations/2.2.png';
import decor23 from '../../img/decorations/2.3.png';
import decor32 from '../../img/decorations/3.2.png';
import decor33 from '../../img/decorations/3.3.png';

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Map = () => {
  return (
    <MapWrapper>
      <MapFragment roadImg={road11} />
      <MapFragment roadImg={road12} />
      <MapFragment roadImg={road13} />
      <MapFragment roadImg={road14} />
      <MapFragment roadImg={road21} />
      <MapFragment roadImg={road22} treeImg={tree22} decorationImg={decor22} />
      <MapFragment roadImg={road23} treeImg={tree23} decorationImg={decor23} />
      <MapFragment roadImg={road24} />
      <MapFragment roadImg={road31} />
      <MapFragment roadImg={road32} treeImg={tree32} decorationImg={decor32} />
      <MapFragment roadImg={road33} treeImg={tree33} decorationImg={decor33} />
      <MapFragment roadImg={road34} />
      <MapFragment roadImg={road41} />
      <MapFragment roadImg={road42} />
      <MapFragment roadImg={road43} />
      <MapFragment roadImg={road44} />
    </MapWrapper>
  );
};
