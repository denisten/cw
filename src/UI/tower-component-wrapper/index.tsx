import React, { memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TowerLevel, TowersTypes } from '../../effector/towers-progress/store';
import { UpgradeButton } from '../update-button';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { scrollToCurrentTower } from '../../utils/scroll-to-current-tower';
import { Markers } from '../../components/markers';
import { TowersMarkerStore } from '../../effector/towers-marker/store';
import { BuildingsService } from '../../buildings/config';
import { MTSSans } from '../../fonts';
import { extraTowerInfoModalOpen } from '../../effector/tower-info-modal-store/events';
import { useStore } from 'effector-react';
import { TowerInfoModalStore } from '../../effector/tower-info-modal-store/store';
import { AppConditionStore } from '../../effector/app-condition/store';
import signBcg from './signBcg.svg';
import { TowerUpgradeAnimation } from '../tower-upgrade-animation';

import towerUpgrade from '../../sound/tower-upgrade.mp3';
import { SettingsStore } from '../../effector/settings/store';
import { useAudio } from '../../hooks/use-sound';
import { reactGAEvent } from '../../utils/ga-event';
import { FRRImg } from '../../components/first-render-require-img';

enum strokeClassNames {
  STROKE = 'stroke',
  STROKE_ACTIVE = 'strokeActive',
}
export const fixSizeClassName = 'fix-size';

export enum TowerClassNames {
  MUTED = 'muted',
  HOVERED = 'hovered',
}

export const Signature = styled.div`
  position: absolute;
  min-height: 32px;
  z-index: 2;
  background-image: url(${signBcg});
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 25px;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  opacity: 0;
  transition: opacity 0.4s;
  bottom: -10%;
`;

const SpanElem = styled.div<{ mtsFlag: boolean }>`
  font-family: ${props =>
    props.mtsFlag ? MTSSans.ULTRA_WIDE : MTSSans.MEDIUM};
  font-size: 16px;
  line-height: 22px;
  color: #e61818;
  box-sizing: border-box;

  &:first-child {
    margin-right: 8px;
  }
  &:last-child {
    margin-right: 0px;
  }
`;

const TowerStyledWrapper = styled.div<ITowerStyledWrapper>`
  display: flex;
  position: absolute;
  top: ${props => props.posX}%;
  left: ${props => props.posY}%;
  z-index: ${props => props.zIndex};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  scroll-margin-right: ${props =>
    props.scrollShift && props.DOMLoaded ? props.scrollShift : 0}px;

  justify-content: center;


  &.${TowerClassNames.HOVERED} ${Signature} {
    opacity: 1 !important;
  }


  &.${TowerClassNames.MUTED} {
    &::before {
      content: 'Скоро открытие';
      position: absolute;
      top: 85%;
      left: 50%;
      transform: translate(-50%, 0%);
      padding: 6px;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      font-size: 18px;
      font-family: ${MTSSans.BOLD};
      white-space: nowrap;
      border-radius: 4px;
      z-index: 2;
    }
    
  }

  .${strokeClassNames.STROKE} {
    display: none;
  }

  .${strokeClassNames.STROKE_ACTIVE} {
    display: block;
  }


  &:hover {
    z-index: ${ZIndexes.HOVERED_BUILDING} !important;
  }

  &[data-towertype=${TowersTypes.UNIVERSITY}] ${Signature} {
    bottom: 10%;
  }

  &[data-towertype=${TowersTypes.FITNESS}] ${Signature} {
    bottom: 0%;
  }

  &[data-towertype=${TowersTypes.TV}] ${Signature},
  &[data-towertype=${TowersTypes.THEATER}] ${Signature}
    {
    bottom: 5%;
  }

`;

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

    const markers = useStore(TowersMarkerStore)[towerTitle];
    const markersDisplayFlag =
      !mutedImg && !needUpgrade && markers && markers.length > 0;

    const {
      sound: { volume },
    } = useStore(SettingsStore);

    const { play: towerUpgradePlay } = useAudio(towerUpgrade, false, volume);

    useEffect(() => {
      upgradeFlag && volume && towerUpgradePlay();
    }, [upgradeFlag]);

    const handleClick = () => {
      reactGAEvent({
        eventLabel: eventLabel,
        eventCategory: 'mir',
        filterName: 'zdanie',
      });
      if (mutedImg) return;
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
    return (
      <TowerStyledWrapper
        posX={posX}
        posY={posY}
        zIndex={zIndex}
        width={width}
        height={height}
        ref={towerRef}
        scrollShift={towerInfoShift}
        DOMLoaded={DOMLoaded}
        data-towertype={towerTitle}
      >
        {!mutedImg && (
          <Markers
            towerRef={towerRef}
            towerLevel={currentLevel}
            markersCollection={markers}
            towerTitle={towerTitle}
            displayFlag={markersDisplayFlag}
            eventLabel={eventLabel}
          />
        )}
        <UpgradeButton
          tutorialCondition={tutorialCondition}
          displayFlag={needUpgrade}
          towerTitle={towerTitle}
          towerLevel={currentLevel}
          animFlag={
            tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO
          }
          eventLabel={eventLabel}
        />

        {upgradeFlag && <TowerUpgradeAnimation wideTower={wideTower} />}
        <FRRImg
          src={mutedImg ? mutedImg : tower}
          useMap={'#' + tower}
          style={TowerStyleConfig}
        />
        <map name={tower}>
          <area
            alt="area"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            coords={areaCoords}
            onMouseOver={mouseOverHandle}
            onMouseOut={mouseOutHandle}
            shape="rect"
          />
        </map>
        <img
          ref={strokeRef}
          className={
            !upgradeFlag && focusOn === towerTitle
              ? strokeClassNames.STROKE_ACTIVE
              : strokeClassNames.STROKE
          }
          src={shadowImg}
          alt="shadow"
        />

        {signConfig && (
          <Signature>
            {signConfig.map((signElem, ind) => (
              <SpanElem
                mtsFlag={signElem === 'МТС' || signElem === 'MTS'}
                key={ind}
              >
                {signElem}
              </SpanElem>
            ))}
          </Signature>
        )}
      </TowerStyledWrapper>
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

interface ITowerStyledWrapper {
  posX: number;
  posY: number;
  zIndex?: number;
  width: number;
  height: number;
  scrollShift?: number | null;
  DOMLoaded: boolean;
}
