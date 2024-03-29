import React from 'react';
import styled from 'styled-components';
import { TowersTypes } from '../../effector/towers-progress/store';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Timer } from './timer';
import { scaleAnimation } from '../../hoc/scale-anim';
import { IMarker } from '../../effector/towers-marker/store';
import { markerClickHandler } from '../../utils/marker-click-handler';
import { Icon } from '../../UI/icons';
import takeRewardSound from '../../sound/take-reward.mp3';
import { useStore } from 'effector-react';
import { SettingsStore } from '../../effector/settings/store';
import { useAudio } from '../../hooks/use-sound';
import { IDisplayFlag } from '../root-component';
import { reactGAEvent } from '../../utils/ga-event';

export enum MarkerTypes {
  TASK = 'zadaniya',
  SUCCESS = 'nagrada',
  TAKE_REWARD = 'takeReward',
  UPGRADE_TOWER = 'upgradeTower',
  TIMER = 'timer',
  ACTIVE_TASK = 'aktivnoe_zadanie',
  PLAY = 'igrat',
}

const minScale = 0.9;

const selectAnimation = (animFlag?: boolean) =>
  animFlag && scaleAnimation(minScale);

export const MarkerView = styled.div<IMarkerView>`
  cursor: pointer;
  width: 64px;
  height: 68px;
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
    transform: translate3d(-50%,0%, 0);

    &:hover {
      transform: translate3d(-50%,0%, 0) scale(1.2);
    }
  }

  ${MarkerView}:nth-child(3) {
    transform: translate3d(-100%,0%, 0);
    z-index:1;

    &:hover {
      z-index: 3;
      transform: translate3d(-100%,0%, 0) scale(1.2);
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

  &[data-towertype=${TowersTypes.LIBRARY}] {
    &[data-towerlevel='0'],
    &[data-towerlevel='1'] {
      top: 100px;
    }
    &[data-towerlevel='2'] {
      top: 40px;
    }
  }
`;

const styleConfig = {
  icons: {
    width: '100%',
    height: '100%',
  },
};

export const Markers: React.FC<IMarkers> = ({
  markersCollection,
  towerTitle,
  displayFlag,
  towerLevel,
  towerRef,
  eventLabel,
}) => {
  const {
    sound: { volume },
  } = useStore(SettingsStore);
  const { play: playRewardSound } = useAudio(takeRewardSound);

  return (
    <MarkerWrapper
      displayFlag={displayFlag}
      data-towertype={towerTitle}
      data-towerlevel={towerLevel}
    >
      {markersCollection.map(markItem =>
        markItem.type !== MarkerTypes.TIMER ? (
          <MarkerView
            data-type={markItem.type}
            key={markItem.type}
            onClick={e => {
              if (markItem.type === MarkerTypes.TAKE_REWARD && volume) {
                playRewardSound();
              }
              markerClickHandler(markItem, towerTitle, towerRef, e);
              reactGAEvent({
                eventLabel: eventLabel,
                eventCategory: 'mir',
                eventContent: markItem.type,
                filterName: 'ikonka',
                buttonLocation: null,
              });
            }}
          >
            <Icon type={markItem.type} style={styleConfig.icons} />
          </MarkerView>
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

export interface IMarkers extends IDisplayFlag {
  markersCollection: IMarker[];
  towerTitle: TowersTypes;
  towerLevel?: number;
  towerRef?: React.RefObject<HTMLDivElement>;
  eventLabel?: string;
}

interface IMarkerView {
  animFlag?: boolean;
}
