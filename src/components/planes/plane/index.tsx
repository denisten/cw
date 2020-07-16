import React from 'react';
import styled from 'styled-components';
import { IPlaneItem } from '../plane-config';
import { ZIndexes } from '../../root-component/z-indexes-enum';

const PlaneBody = styled.div<IPlaneItem>`
  position: absolute;
  width: ${props => props.width};
  height: ${props => props.height};
  top: ${props => props.top};
  left: ${props => props.left};
  background: url(${props => props.backgroundImage}) no-repeat center;
  background-size: 100% 100%;
  z-index: ${ZIndexes.BUILDING_FOUR_LEVEL};
`;

export const Plane = ({ ...props }) => <PlaneBody {...props} />;
