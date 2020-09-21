import React, { memo, useEffect, useRef } from 'react';
import { TowerLevel, TowersTypes } from '../../effector/towers-progress/store';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { scrollToCurrentTower } from '../../utils/scroll-to-current-tower';
import { TowersMarkerStore } from '../../effector/towers-marker/store';
import { BuildingsService } from '../../buildings/config';
import { extraTowerInfoModalOpen } from '../../effector/tower-info-modal-store/events';
import { useStore } from 'effector-react';
import { TowerInfoModalStore } from '../../effector/tower-info-modal-store/store';
import { AppConditionStore } from '../../effector/app-condition/store';
import { SettingsStore } from '../../effector/settings/store';
import { reactGAEvent } from '../../utils/ga-event';
import towerOpenSound from '../../sound/tower-open.mp3';
import useSound from 'use-sound';
import { TowerComponentWrapperLayout } from './layout';
import { TasksStore } from '../../effector/tasks-store/store';
import { MissionsStore } from '../../effector/missions-store/store';
import { useHideEmptyTaskMarker } from '../../hooks/use-hide-empty-task-marker';

enum strokeClassNames {
  STROKE = 'stroke',
  STROKE_ACTIVE = 'strokeActive',
}
export const fixSizeClassName = 'fix-size';

export enum TowerClassNames {
  MUTED = 'muted',
  HOVERED = 'hovered',
}
const maxMouseMoveFaultAfterClick = 20;

const createTowerStyleConfig = (
  width: number,
  height: number
): React.CSSProperties => ({
  width: `${width}px`,
  height: `${height}px`,
  position: 'absolute',
});

export const TowerWrapper = memo(
  ({
    position: [posX, posY],
    currentLevel,
    areaCoords,
    shadowImg,
    tower,
    height,
    width,
    zIndex,
    towerTitle,
    needUpgrade,
    tutorialTower,
    wideTower,
    mutedImg,
    signConfig,
    eventLabel,
  }: ITowerWrapper): React.ReactElement => {
    let mouseDownFlag = false,
      mouseMoveFlag = 0;
    const towerRef = useRef<HTMLDivElement>(null);
    const strokeRef = useRef<HTMLImageElement>(null);
    const TowerStyleConfig = createTowerStyleConfig(width, height);
    const { focusOn, towerInfoShift } = useStore(TowerInfoModalStore);
    const { upgradingTowerTitle, DOMLoaded } = useStore(AppConditionStore);
    const { tutorialCondition, tutorialPause } = useStore(TutorialStore);
    const upgradeFlag = upgradingTowerTitle === towerTitle;

    const tasks = useStore(TasksStore);
    const missions = useStore(MissionsStore);
    useHideEmptyTaskMarker({ tasks, missions, towerTitle });

    const markers = useStore(TowersMarkerStore)[towerTitle];
    const markersDisplayFlag =
      !mutedImg && !needUpgrade && markers && markers.length > 0;

    const { volume } = useStore(SettingsStore).sound;
    const [playOpenTowerSound] = useSound(towerOpenSound, { volume });

    const handleClick = () => {
      if (mutedImg) return;
      playOpenTowerSound();
      if (
        tutorialCondition === TutorialConditions.ARROW_TOWER_INFO &&
        tutorialTower
      ) {
        reactGAEvent({
          eventLabel: 'zdanie',
          eventCategory: 'onboarding',
          eventContext: 'step8',
        });
        nextTutorStep();
      } else if (!tutorialCondition || tutorialPause) {
        scrollToCurrentTower(towerRef);
        extraTowerInfoModalOpen(towerTitle);
        reactGAEvent({
          eventLabel: eventLabel,
          eventCategory: 'mir',
          filterName: 'zdanie',
          buttonLocation: null,
        });
      }
    };

    const handleMouseDown = () => {
      mouseDownFlag = true;
    };

    const handleMouseMove = () => {
      if (mouseDownFlag) {
        mouseMoveFlag += 1;
      }
    };
    const handleMouseUp = () => {
      if (mouseDownFlag && mouseMoveFlag < maxMouseMoveFaultAfterClick) {
        handleClick();
        mouseMoveFlag = 0;
      }
    };

    const mouseOverHandle = () => {
      if (mutedImg) {
        towerRef.current &&
          towerRef.current.classList.add(TowerClassNames.MUTED);
        return;
      }
      strokeRef.current &&
        strokeRef.current.classList.add(strokeClassNames.STROKE_ACTIVE);

      towerRef.current &&
        towerRef.current.classList.add(TowerClassNames.HOVERED);
    };

    const mouseOutHandle = () => {
      if (mutedImg) {
        towerRef.current &&
          towerRef.current.classList.remove(TowerClassNames.MUTED);
      }
      strokeRef.current &&
        strokeRef.current.classList.remove(strokeClassNames.STROKE_ACTIVE);

      towerRef.current &&
        towerRef.current.classList.remove(TowerClassNames.HOVERED);
    };
    useEffect(() => {
      BuildingsService.setRefForTower(towerTitle, towerRef);
    }, []);

    const areaProps = {
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseMove: handleMouseMove,
      coords: areaCoords,
      onMouseOver: mouseOverHandle,
      onMouseOut: mouseOutHandle,
    };
    const FRRImgProps = {
      src: mutedImg || tower,
      useMap: '#' + tower,
      style: TowerStyleConfig,
    };
    const towerStyledWrapperProps = {
      posX,
      posY,
      zIndex,
      width,
      height,
      ref: towerRef,
      scrollShift: towerInfoShift,
      DOMLoaded,
    };
    const markersProps = {
      towerRef,
      towerLevel: currentLevel,
      markersCollection: markers,
      towerTitle,
      displayFlag: markersDisplayFlag,
      eventLabel,
    };
    const upgradeButtonProps = {
      tutorialCondition,
      displayFlag: needUpgrade,
      towerTitle,
      towerLevel: currentLevel,
      animFlag:
        tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO,
      eventLabel,
    };
    const strokeProps = {
      ref: strokeRef,
      className:
        !upgradeFlag && focusOn === towerTitle
          ? strokeClassNames.STROKE_ACTIVE
          : strokeClassNames.STROKE,
      src: shadowImg,
    };
    return (
      <TowerComponentWrapperLayout
        upgradeFlag={upgradeFlag}
        areaProps={areaProps}
        FRRImgProps={FRRImgProps}
        towerStyledWrapperProps={towerStyledWrapperProps}
        markersProps={markersProps}
        upgradeButtonProps={upgradeButtonProps}
        strokeProps={strokeProps}
        mutedImg={mutedImg}
        towerImg={tower}
        towerTitle={towerTitle}
        wideTower={wideTower}
        signConfig={signConfig}
      />
    );
  }
);

interface ITowerWrapper {
  mutedImg?: string;
  position: number[];
  maxLevel: TowerLevel;
  wideTower: boolean;
  currentLevel: TowerLevel;
  areaCoords: string;
  shadowImg: string;
  tower: string;
  width: number;
  height: number;
  zIndex?: number;
  towerTitle: TowersTypes;
  needUpgrade: boolean;
  tutorialTower?: boolean;
  signConfig?: string[];
  eventLabel?: string;
}
