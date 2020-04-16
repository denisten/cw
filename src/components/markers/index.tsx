import React from 'react';
import styled from 'styled-components';
import notice from './notice.png';
import success from './success.png';
import time from './time.png';
import update from './update.png';
import { TowersTypes } from '../../effector/towers-progress/store';
import { hideMarker } from '../../effector/towers-marker/events';
import { extraTowerInfoModalOpen } from '../../effector/app-condition/events';

export enum typeOfMarkers {
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

const MarkerWrapper = styled.div`
  height: 157px;
  width: auto;
  top: -30px;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
`;

const MarkerView = styled.div<{ markerType: string }>`
  background: url(${props => selectBackground(props.markerType)}) no-repeat
    center;
  height: 100%;
  width: 147px;
  cursor: pointer;
`;

export const Markers: React.FC<IMarkers> = ({
  markersCollection,
  towerTitle,
}) => {
  const clickHandler = (markerType: typeOfMarkers) => {
    hideMarker({ towerTitle: towerTitle, type: markerType });
    extraTowerInfoModalOpen(towerTitle);
  };
  return (
    <MarkerWrapper>
      {markersCollection.map(markItem => (
        <MarkerView
          key={markItem.type}
          markerType={markItem.type}
          onClick={() => clickHandler(markItem.type)}
        />
      ))}
    </MarkerWrapper>
  );
};

interface IMarkers {
  markersCollection: { type: typeOfMarkers; duration?: number }[];
  towerTitle: TowersTypes;
}
