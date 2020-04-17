import React from 'react';
import styled from 'styled-components';
import notice from './notice.svg';
import success from './success.svg';
import update from './update.svg';
import coin from './coin.svg';
import { TowersTypes } from '../../effector/towers-progress/store';
import { hideMarker } from '../../effector/towers-marker/events';
import { extraTowerInfoModalOpen } from '../../effector/app-condition/events';
import { ZIndexes } from '../root-component/z-indexes-enum';

export enum typeOfMarkers {
  NOTICE = 'notice',
  SUCCESS = 'success',
  COIN = 'coin',
  UPDATE = 'update',
}

const selectBackground = (markerType: string) => {
  switch (markerType) {
    case typeOfMarkers.NOTICE:
      return notice;
    case typeOfMarkers.SUCCESS:
      return success;
    case typeOfMarkers.COIN:
      return coin;
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

    &:hover {
      transform: translate3d(-25px, 25px, 0) scale(1.2);
    }
  }
`;

const MarkerView = styled.div<{ markerType: string }>`
  background: url(${props => selectBackground(props.markerType)}) no-repeat
    center;
  background-size: 100% 100%;
  cursor: pointer;
  width: 60px;
  height: 66px;
  transition: 0.5s;

  &:hover {
    transform: scale(1.1);
  }
  &[data-type='coin'] {
    width: 95px;
    height: 103px;
  }
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
          data-type={markItem.type}
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
