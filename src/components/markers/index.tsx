import React from 'react';
import styled from 'styled-components';
import notice from './notice.svg';
import success from './success.svg';
import update from './update.svg';
import coin from './coin.svg';
import { TowersTypes } from '../../effector/towers-progress/store';
import { hideMarker } from '../../effector/towers-marker/events';
import {
  extraTowerInfoModalOpen,
  setTowerInfoContent,
  setTowerInfoContentIndex,
} from '../../effector/app-condition/events';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Timer } from './timer';
import { TowerInfoContentValues } from '../../effector/app-condition/store';
import { IndexDomElements } from '../tower-info';
import { scaleAnimation } from '../../hoc/scale-anim';
import { addMoney } from '../../effector/user-data/events';

export enum typeOfMarkers {
  NOTICE = 'notice',
  SUCCESS = 'success',
  COIN = 'coin',
  UPDATE = 'update',
  TIMER = 'timer',
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
const minScale = 0.9;
export const MarkerView = styled.div<{
  markerType: string;
  animFlag?: boolean;
}>`
  background: url(${props => selectBackground(props.markerType)}) no-repeat
    center;
  background-size: 100% 100%;
  cursor: pointer;
  width: 60px;
  height: 66px;
  transition: 0.5s;
  animation-name: ${props =>
    props.animFlag ? scaleAnimation(minScale) : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 1s;

  &:hover {
    transform: scale(1.1);
  }
  &[data-type='coin'] {
    width: 95px;
    height: 103px;
  }
`;

export const MarkerWrapper = styled.div`
  height: auto;
  width: auto;
  top: 0px;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  z-index: ${ZIndexes.UI_BUTTON};

  ${MarkerView}:nth-child(2) {
    transform: translate3d(-25px, 25px, 0);

    &:hover {
      transform: translate3d(-25px, 25px, 0) scale(1.2);
    }
  }
`;

export const Markers: React.FC<IMarkers> = ({
  markersCollection,
  towerTitle,
}) => {
  const clickHandler = (marker: IMarkerItem) => {
    hideMarker({ towerTitle: towerTitle, type: marker.type });
    switch (marker.type) {
      case typeOfMarkers.NOTICE:
      case typeOfMarkers.SUCCESS:
        extraTowerInfoModalOpen(towerTitle);
        setTowerInfoContent(TowerInfoContentValues.TASK);
        setTowerInfoContentIndex(IndexDomElements.TASK);
        break;
      case typeOfMarkers.COIN:
        addMoney(marker.coins || 0);
        break;

      default:
        break;
    }
  };

  return (
    <MarkerWrapper>
      {markersCollection.map(markItem =>
        markItem.type !== typeOfMarkers.TIMER ? (
          <MarkerView
            data-type={markItem.type}
            key={markItem.type}
            markerType={markItem.type}
            onClick={() => clickHandler(markItem)}
          />
        ) : (
          <Timer
            key={markItem.type}
            startTime={markItem.startTime}
            endTime={markItem.endTime}
          />
        )
      )}
    </MarkerWrapper>
  );
};

interface IMarkers {
  markersCollection: IMarkerItem[];
  towerTitle: TowersTypes;
}

interface IMarkerItem {
  type: typeOfMarkers;
  startTime?: Date;
  endTime?: Date;
  coins?: number;
}
