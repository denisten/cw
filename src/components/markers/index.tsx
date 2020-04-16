import React from 'react';
import styled from 'styled-components';
import notice from './notice.svg';
import success from './success.svg';
import time from './time.png';
import update from './update.svg';
import { TowersTypes } from '../../effector/towers-progress/store';
import { hideMarker } from '../../effector/towers-marker/events';
import { extraTowerInfoModalOpen } from '../../effector/app-condition/events';
import { ZIndexes } from '../root-component/z-indexes-enum';

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
  height: auto;
  width: auto;
  top: 0px;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  z-index: ${ZIndexes.UI_BUTTON};

  div:nth-child(2) {
    transform: translate3d(-25px, 25px, 0);
  }
`;

const MarkerView = styled.div<{ markerType: string }>`
  background: url(${props => selectBackground(props.markerType)}) no-repeat
    center;
  background-size: 100% 100%;
  cursor: pointer;
  width: 92px;
  height: 99px;
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
