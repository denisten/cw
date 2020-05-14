import React from 'react';
import styled from 'styled-components';
import notice from './notice.svg';
import success from './success.svg';
import update from './update.svg';
import coin from './coin.svg';
import { TowersTypes } from '../../effector/towers-progress/store';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Timer } from './timer';
import { scaleAnimation } from '../../hoc/scale-anim';
import { IMarker } from '../../effector/towers-marker/store';
import { markerClickHandler } from '../../utils/markerClickHandler';

export enum TypeOfMarkers {
  NOTICE = 'notice',
  SUCCESS = 'success',
  COIN = 'coin',
  UPDATE = 'update',
  TIMER = 'timer',
}

const selectBackground = (markerType: string) => {
  switch (markerType) {
    case TypeOfMarkers.NOTICE:
      return notice;
    case TypeOfMarkers.SUCCESS:
      return success;
    case TypeOfMarkers.COIN:
      return coin;
    case TypeOfMarkers.UPDATE:
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
  width: 64px;
  height: 68px;
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
`;

export const MarkerWrapper = styled.div<{ displayFlag: boolean }>`
  height: auto;
  width: auto;
  top: 10px;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);

  display: ${props => (props.displayFlag ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: ${ZIndexes.UI_BUTTON};

  ${MarkerView}:nth-child(2) {
    transform: translate3d(-25px, 25px, 0);

    &:hover {
      transform: translate3d(-25px, 25px, 0) scale(1.2);
    }
  }

  &[data-towertype=${TowersTypes.MAIN_TOWER}] {
    &[data-towerlevel='0'],
    &[data-towerlevel='1'] {
      top: 205px;
    }
    &[data-towerlevel='2'] {
      top: 85px;
    }
  }

  &[data-towertype=${TowersTypes.MY_MTS}] {
    &[data-towerlevel='0'],
    &[data-towerlevel='1'] {
      top: 145px;
    }
    &[data-towerlevel='2'] {
      top: 50px;
    }
  }

  &[data-towertype=${TowersTypes.CASHBACK}] {
    &[data-towerlevel='0'],
    &[data-towerlevel='1'] {
      top: 200px;
    }
    &[data-towerlevel='2'] {
      top: 150px;
    }
    &[data-towerlevel='3'] {
      top: 60px;
    }
  }
  &[data-towertype=${TowersTypes.LIVE_ARENA}] {
    &[data-towerlevel='0'],
    &[data-towerlevel='1'] {
      top: 100px;
    }
    &[data-towerlevel='2'] {
      top: 80px;
    }
    &[data-towerlevel='3'] {
      top: 60px;
    }
  }

  &[data-towertype=${TowersTypes.THEATER}] {
    &[data-towerlevel='0'],
    &[data-towerlevel='1'] {
      top: 85px;
    }
    &[data-towerlevel='2'],
    &[data-towerlevel='3'] {
      top: 50px;
    }
  }

  &[data-towertype=${TowersTypes.TV}] {
    &[data-towerlevel='0'],
    &[data-towerlevel='1'] {
      top: 360px;
    }
    &[data-towerlevel='2'] {
      top: 180px;
    }
    &[data-towerlevel='3'] {
      top: 100px;
    }
  }
  &[data-towertype=${TowersTypes.SMARTMED}] {
    &[data-towerlevel='0'],
    &[data-towerlevel='1'] {
      top: 185px;
    }
    &[data-towerlevel='2'] {
      top: 80px;
    }

  }
`;

export const Markers: React.FC<IMarkers> = ({
  markersCollection,
  towerTitle,
  displayFlag,
  towerLevel,
  towerRef,
}) => {
  return (
    <MarkerWrapper
      displayFlag={displayFlag}
      data-towertype={towerTitle}
      data-towerlevel={towerLevel}
    >
      {markersCollection.map(markItem =>
        markItem.type !== TypeOfMarkers.TIMER ? (
          <MarkerView
            data-type={markItem.type}
            key={markItem.type}
            markerType={markItem.type}
            onClick={() => markerClickHandler(markItem, towerTitle, towerRef)}
          />
        ) : (
          <Timer
            key={markItem.type}
            startTime={markItem.startTime}
            endTime={markItem.endTime}
            towerTitle={towerTitle}
          />
        )
      )}
    </MarkerWrapper>
  );
};

interface IMarkers {
  markersCollection: IMarker[];
  towerTitle: TowersTypes;
  displayFlag: boolean;
  towerLevel?: number;
  towerRef?: React.RefObject<HTMLDivElement>;
}
