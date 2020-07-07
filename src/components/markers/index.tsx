import React from 'react';
import styled from 'styled-components';
import notice from './notice.svg';
import success from './success.svg';
import upgradeTower from './upgrade.svg';
import activeTask from './active-task.svg';
import coin from './coin.svg';
import { TowersTypes } from '../../effector/towers-progress/store';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Timer } from './timer';
import { scaleAnimation } from '../../hoc/scale-anim';
import { IMarker } from '../../effector/towers-marker/store';
import { markerClickHandler } from '../../utils/marker-click-handler';
import { IDisplayFlag } from '../skip-tutorial';

export enum TypeOfMarkers {
  TASK = 'task',
  SUCCESS = 'success',
  TAKE_REWARD = 'takeReward',
  UPGRADE_TOWER = 'upgradeTower',
  TIMER = 'timer',
  ACTIVE_TASK = 'activeTask',
}

const selectBackground = (markerType: string) => {
  switch (markerType) {
    case TypeOfMarkers.TASK:
      return notice;
    case TypeOfMarkers.SUCCESS:
      return success;
    case TypeOfMarkers.TAKE_REWARD:
      return coin;
    case TypeOfMarkers.ACTIVE_TASK:
      return activeTask;
    case TypeOfMarkers.UPGRADE_TOWER:
      return upgradeTower;
    default:
      break;
  }
};

const minScale = 0.9;
const selectAnimation = (animFlag?: boolean) => {
  if (animFlag) {
    return scaleAnimation(minScale);
  }
};

export const MarkerView = styled.div<IMarkerView>`
  background: url(${props => selectBackground(props.markerType)}) no-repeat
    center;
  background-size: 100% 100%;
  cursor: pointer;
  width: ${props => (props.fullSizeMode ? '204px' : '64px')};
  height: ${props => (props.fullSizeMode ? '208px' : '68px')};
  transition: 0.5s;
  animation-name: ${props => selectAnimation(props.animFlag)};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  z-index: 2;
  position: relative;

  &:hover {
    transform: scale(1.2);
    z-index: 3;
  }
`;

export const MarkerWrapper = styled.div<IDisplayFlag>`
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
    transform: translate3d(-10%, 20%, 0);

    &:hover {
      transform: translate3d(-10%, 20%, 0) scale(1.2);
    }
  }

  ${MarkerView}:nth-child(3) {
    position: absolute;
    left: 65px;
    z-index:1;

    &:hover {
      z-index: 3;
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

  &[data-towertype=${TowersTypes.AUTO}] {
    &[data-towerlevel='0'] {
      top: 100px;
    }

  }

  &[data-towertype=${TowersTypes.MOBILE_NETWORK}] {
    &[data-towerlevel='0'],
    &[data-towerlevel='1'] {
      top: 100px;
    }
    &[data-towerlevel='2'] {
      top: 40px;
    }
  }

  &[data-towertype=${TowersTypes.OBSERVATORY}] {
    &[data-towerlevel='0'],
    &[data-towerlevel='1'] {
      top: 155px;
    }
    &[data-towerlevel='2'] {
      top: 115px;
    }
  }
`;

export const Markers: React.FC<IMarkers> = ({
  markersCollection,
  towerTitle,
  displayFlag,
  towerLevel,
  towerRef,
  fullSizeMode,
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
            fullSizeMode={fullSizeMode}
            data-type={markItem.type}
            key={markItem.type}
            markerType={markItem.type}
            onClick={e => markerClickHandler(markItem, towerTitle, towerRef, e)}
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
  fullSizeMode?: boolean;
}

interface IMarkerView {
  markerType: string;
  animFlag?: boolean;
  fullSizeMode?: boolean;
}
