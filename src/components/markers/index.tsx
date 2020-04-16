import React from 'react';
import styled from 'styled-components';
import notice from './notice.png';
import success from './success.png';
import time from './time.png';
import update from './update.png';

enum typeOfMarkers {
  NOTICE = 'notice',
  SUCCESS = 'success',
  TIME = 'time',
  UPDATE = 'update',
}

const selectBackground = (markerType: string) => {
  switch (markerType) {
    case typeOfMarkers.NOTICE:
      return notice;
    case typeOfMarkers.SUCCESS:
      return success;
    case typeOfMarkers.TIME:
      return time;
    case typeOfMarkers.UPDATE:
      return update;
    default:
      break;
  }
};

const MakrerView = styled.div<{ markerType: string }>`
  height: '157px';
  width: '147px';
  top: '0%';
  left: '50%';
  position: 'absolute';
  transform: translate(-50%, -50%);
  background: url(${props => selectBackground(props.markerType)}) no-repeat
    center;
`;

export const Markers: React.FC<IMarkers> = ({ markerType }) => {
  return <MakrerView markerType={markerType} />;
};

interface IMarkers {
  markerType: string;
}
