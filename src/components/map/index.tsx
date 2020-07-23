import React from 'react';
import styled from 'styled-components';
import road11 from '../../img/roads/1.1.png';
import road12 from '../../img/roads/1.2.png';
import road13 from '../../img/roads/1.3.png';
import road21 from '../../img/roads/2.1.png';
import road22 from '../../img/roads/2.2.png';
import road23 from '../../img/roads/2.3.png';
import road31 from '../../img/roads/3.1.png';
import road32 from '../../img/roads/3.2.png';
import road33 from '../../img/roads/3.3.png';
import { MapFragment } from '../../UI/map-fragment';
import tree22 from '../../img/trees/2.2.png';
import decor22 from '../../img/decorations/2.2.png';

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
      <MapFragment roadImg={road21} />
      <MapFragment roadImg={road22} treeImg={tree22} decorationImg={decor22} />
      <MapFragment roadImg={road23} />
      <MapFragment roadImg={road31} />
      <MapFragment roadImg={road32} />
      <MapFragment roadImg={road33} />
    </MapWrapper>
  );
};
