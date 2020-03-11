import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { TowersProgressStore } from '../../../effector/towers-progress/store';
import planeLevel0 from './plane_v_1.png';
import planeLevel1 from './plane_v_2.png';
import planeLevel2 from './plane_v_3.png';

const switchPlaneBackground = (planeLevel: number) => {
  if (planeLevel === 0) {
    return planeLevel0;
  } else if (planeLevel === 1) {
    return planeLevel1;
  } else {
    return planeLevel2;
  }
};

const PlaneBody = styled.div<IPlaneBody>`
  width: 107px;
  height: 71px;
  background-color: red;
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  background: url(${props => switchPlaneBackground(props.planeLevel)}) no-repeat
    center;
  background-size: 100% 100%;
  z-index: 100;
`;

export const Plane = ({ ...props }) => {
  const airportLevelStore = useStore(TowersProgressStore).airport.level;
  return <PlaneBody {...props} planeLevel={airportLevelStore} />;
};

interface IPlaneBody {
  planeLevel: number;
  top?: string;
  left?: string;
}
