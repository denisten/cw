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
import tree22 from '../../img/trees/2.2.png';
import { MapFragment } from '../../UI/map-fragment';

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
      <MapFragment style={styleConfig.img11} roadImg={road11} />
      <MapFragment style={styleConfig.img12} roadImg={road12} />
      <MapFragment style={styleConfig.img13} roadImg={road13} />
      <MapFragment style={styleConfig.img21} roadImg={road21} />
      <MapFragment
        style={styleConfig.img22}
        roadImg={road22}
        treeImg={tree22}
      />
      <MapFragment style={styleConfig.img23} roadImg={road23} />
      <MapFragment style={styleConfig.img21} roadImg={road31} />
      <MapFragment style={styleConfig.img22} roadImg={road32} />
      <MapFragment style={styleConfig.img23} roadImg={road33} />
    </MapWrapper>
  );
};
