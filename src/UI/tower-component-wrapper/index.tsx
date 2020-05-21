import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  extraTowerInfoModalOpen,
  showUpgradeIcon,
} from '../../effector/app-condition/events';
import { LazyImage } from '@tsareff/lazy-image';
import { TowerLevel, TowersTypes } from '../../effector/towers-progress/store';
import { UpgradeButton } from '../update-button';
import upgradeThinTowerImg from '../../img/tower-updrade/thin-tower.png';
import upgradeWideTowerImg from '../../img/tower-updrade/wide-tower.png';
import { upgradeTower } from '../../effector/towers-progress/events';
import { maxProgressValue } from '../../effector/app-condition/store';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { Sprite } from '../../components/sprite';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { scrollToCurrentTower } from '../../utils/scroll-to-current-tower';
import { Markers } from '../../components/markers';
import { IMarker } from '../../effector/towers-marker/store';
import { BuildingsService } from '../../buildings/config';
import { updateTowerRequest } from '../../api/updateTower';
import { statusOk } from '../../constants';

const TowerStyledWrapper = styled.div<ITowerStyledWrapper>`
  display: flex;
  position: absolute;
  top: ${props => props.posX}%;
  left: ${props => props.posY}%;
  z-index: ${props => props.zIndex};
  vertical-align: top;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  align-items: flex-end;
`;

const StyledConfig = {
  sprite: {
    ticksPerFrame: 2,
    numberOfFramesX: 7,
    numberOfFramesY: 6,
    infinity: false,
    style: {
      zIndex: ZIndexes.UPGRADE_TOWER_ANIMATION_CANVAS,
      position: 'absolute',
    } as React.CSSProperties,
  },
};

const maxMouseMoveFaultAfterClick = 20;
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

    const handleOnAnimationEnd = async () => {
      if (!tutorialCondition) {
        const resp = await updateTowerRequest(towerTitle);
        if (resp.status === statusOk) {
          upgradeTower(towerTitle);
        } else {
          showUpgradeIcon(null);
        }
      } else {
        upgradeTower(towerTitle);
        nextTutorStep();
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
          displayFlag={progress >= maxProgressValue && currentLevel < maxLevel}
          towerTitle={towerTitle}
          towerLevel={currentLevel}
          animFlag={
            tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO
          }
        />

        {upgradeFlag ? (
          <Sprite
            canvasHeight={height}
            canvasWidth={width}
            onAnimationEnd={handleOnAnimationEnd}
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
        {hoverState || focusOnTowerTitle === towerTitle ? (
          <img src={shadowImg} alt="shadow" />
        ) : null}
      </TowerStyledWrapper>
    );
  }
);

interface ITowerWrapper {
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
}

interface ITowerStyledWrapper {
  posX: number;
  posY: number;
  zIndex?: number;
  width: number;
  height: number;
}
