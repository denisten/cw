import React from 'react';
import styled from 'styled-components';
import { IPlaneItem } from '../../../components/planes/plane-config';
import { ZIndexes } from '../../../components/root-component/z-indexes-enum';

const PlaneBody = styled.div<IPlaneItem>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  background: url(${props => props.backgroundImage}) no-repeat center;
  background-size: 100% 100%;
  z-index: ${ZIndexes.UI_BUTTON};
`;

export const Plane = ({ ...props }) => {
  return <PlaneBody {...props} />;
};
