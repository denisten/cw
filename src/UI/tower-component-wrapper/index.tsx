import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { extraTowerInfoModalOpen } from '../../effector/app-condition/events';
import { LazyImage } from '@tsareff/lazy-image';
import { TowerLevel, TowersTypes } from '../../effector/towers-progress/store';
import { UpgradeButton } from '../update-button';
import upgradeThinTowerImg from '../../img/tower-updrade/thin-tower.png';
import upgradeWideTowerImg from '../../img/tower-updrade/wide-tower.png';
import { maxProgressValue } from '../../effector/app-condition/store';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { Sprite } from '../../components/sprite';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { scrollToCurrentTower } from '../../utils/scroll-to-current-tower';
import { Markers } from '../../components/markers';
import { IMarker } from '../../effector/towers-marker/store';
import { BuildingsService, IAnimSize } from '../../buildings/config';
import { maxMouseMoveFaultAfterClick } from '../../constants';

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
`;

const StyledConfig = {
  sprite: {
    ticksPerFrame: 2,
    numberOfFramesX: 7,
    numberOfFramesY: 6,
    infinity: true,
    style: {
      zIndex: ZIndexes.UPGRADE_TOWER_ANIMATION_CANVAS,
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    } as React.CSSProperties,
  },
};

export const TowerWrapper = memo(
  ({
    position,
    tutorialCondition,
    maxLevel,
    currentLevel,
    areaCoords,
    shadowImg,
    tower,
    height,
    width,
    zIndex,
    towerTitle,
    focusOnTowerTitle,
    progress,
    upgradeFlag,
    tutorialTower,
    tutorialPause,
    wideTower,
    markers = [],
    towerInfoShift,
    DOMLoaded,
    animSize,
  }: ITowerWrapper): React.ReactElement => {
    const [posX, posY] = position;
    let mouseDownFlag = false,
      mouseMoveFlag = 0;
    const [hoverState, setHoverState] = useState(false);
    const towerRef = useRef<HTMLDivElement>(null);
    const TowerStyleConfig = {
      width: `${width}px`,
      height: `${height}px`,
      position: 'absolute',
    } as React.CSSProperties;
    const mouseOverHandle = () => {
      if (!(focusOnTowerTitle && focusOnTowerTitle === towerTitle))
        setHoverState(false);
    };

    const handleClick = () => {
      if (
        tutorialCondition === TutorialConditions.ARROW_TOWER_INFO &&
        tutorialTower
      ) {
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

    useEffect(() => mouseOverHandle(), [focusOnTowerTitle]);
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
      >
        <Markers
          towerRef={towerRef}
          towerLevel={currentLevel}
          markersCollection={markers}
          towerTitle={towerTitle}
          displayFlag={
            progress < maxProgressValue && markers && markers.length > 0
          }
        />
        <UpgradeButton
          tutorialCondition={tutorialCondition}
          displayFlag={progress >= maxProgressValue && currentLevel < maxLevel}
          towerTitle={towerTitle}
          towerLevel={currentLevel}
          animFlag={
            tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO
          }
        />

        {upgradeFlag ? (
          <Sprite
            canvasHeight={animSize.y}
            canvasWidth={animSize.x}
            img={wideTower ? upgradeWideTowerImg : upgradeThinTowerImg}
            {...StyledConfig.sprite}
          />
        ) : (
          ''
        )}
        <LazyImage
          src={tower}
          alt="tower"
          useMap={'#' + tower}
          style={TowerStyleConfig}
        />
        <map name={tower}>
          <area
            alt="area"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOver={() => setHoverState(true)}
            onMouseOut={mouseOverHandle}
            onMouseMove={handleMouseMove}
            coords={areaCoords}
            shape="rect"
          />
        </map>
        {!upgradeFlag && (hoverState || focusOnTowerTitle === towerTitle) ? (
          <img src={shadowImg} alt="shadow" />
        ) : null}
      </TowerStyledWrapper>
    );
  }
);

interface ITowerWrapper {
  animSize: IAnimSize;
  position: number[];
  tutorialCondition: TutorialConditions;
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
  focusOnTowerTitle: TowersTypes | null;
  progress: number;
  upgradeFlag: boolean;
  tutorialTower?: boolean;
  tutorialPause?: boolean;
  scaleValue: number;
  markers: IMarker[];
  towerInfoShift: number;
  DOMLoaded: boolean;
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
