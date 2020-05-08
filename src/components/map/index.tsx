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
import banner22 from '../../img/banners/2.2.png';
import { MapFragment } from '../../UI/map-fragment';
import tree11 from '../../img/trees/1.1.png';
import tree12 from '../../img/trees/1.2.png';
import tree13 from '../../img/trees/1.3.png';
import tree21 from '../../img/trees/2.1.png';
import tree22 from '../../img/trees/2.2.png';
import tree23 from '../../img/trees/2.3.png';
import tree31 from '../../img/trees/3.1.png';
import tree32 from '../../img/trees/3.2.png';
import tree33 from '../../img/trees/3.3.png';
import decor12 from '../../img/decorations/1.2.png';
import decor21 from '../../img/decorations/2.1.png';
import decor22 from '../../img/decorations/2.2.png';

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
      <MapFragment
        style={styleConfig.img11}
        roadImg={road11}
        treeImg={tree11}
      />
      <MapFragment
        style={styleConfig.img12}
        roadImg={road12}
        treeImg={tree12}
        decorationImg={decor12}
      />
      <MapFragment
        style={styleConfig.img13}
        roadImg={road13}
        treeImg={tree13}
      />
      <MapFragment
        style={styleConfig.img21}
        roadImg={road21}
        treeImg={tree21}
        decorationImg={decor21}
      />
      <MapFragment
        style={styleConfig.img22}
        roadImg={road22}
        treeImg={tree22}
        bannerImg={banner22}
        decorationImg={decor22}
      />
      <MapFragment
        style={styleConfig.img23}
        roadImg={road23}
        treeImg={tree23}
      />
      <MapFragment
        style={styleConfig.img21}
        roadImg={road31}
        treeImg={tree31}
      />
      <MapFragment
        style={styleConfig.img22}
        roadImg={road32}
        treeImg={tree32}
      />
      <MapFragment
        style={styleConfig.img23}
        roadImg={road33}
        treeImg={tree33}
      />
    </MapWrapper>
  );
};
