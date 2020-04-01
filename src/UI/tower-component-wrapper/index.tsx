import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { extraTowerInfoModalOpen } from '../../effector/app-condition/events';
import { LazyImage } from '@tsareff/lazy-image';
import { TowerLevel, TowersTypes } from '../../effector/towers-progress/store';
import { UpgradeButton } from '../update-button';
import upgradeTowerImg from '../../img/tower-updrade/thin-tower.png';
import {
  addRefForTower,
  upgradeTower,
} from '../../effector/towers-progress/events';
import { maxProgressValue } from '../../effector/app-condition/store';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { Sprite } from '../../components/sprite';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { scrollToCurrentTower } from '../../utils/scroll-to-current-tower';

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

const minDifBetweenMouseEvents = 120;
const StyledConfig = {
  sprite: {
    ticksPerFrame: 2,
    numberOfFramesX: 7,
    img: upgradeTowerImg,
    numberOfFramesY: 6,
    infinity: false,
    style: {
      zIndex: ZIndexes.UPGRADE_TOWER_ANIMATION_CANVAS,
      position: 'absolute',
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
  }: ITowerWrapper): React.ReactElement => {
    const [posX, posY] = position;

    let mouseDownDate: number = +new Date(0),
      mouseUpDate: number = +new Date(0);

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
      mouseDownDate = +new Date();
    };

    const handleMouseUp = () => {
      mouseUpDate = +new Date();
      const diff = mouseUpDate - mouseDownDate;
      if (diff < minDifBetweenMouseEvents) {
        handleClick();
      }
      mouseDownDate = +new Date(0);
      mouseUpDate = +new Date(0);
    };

    const handleOnAnimationEnd = () => {
      upgradeTower(towerTitle);
      if (tutorialCondition) nextTutorStep();
    };

    useEffect(() => mouseOverHandle(), [focusOnTowerTitle]);
    useEffect(() => {
      addRefForTower({ ref: towerRef, tower: towerTitle });
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
        {progress >= maxProgressValue && currentLevel < maxLevel ? (
          <UpgradeButton
            towerTitle={towerTitle}
            animFlag={
              tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO
            }
          />
        ) : null}
        {upgradeFlag ? (
          <Sprite
            canvasHeight={height}
            canvasWidth={width}
            onAnimationEnd={handleOnAnimationEnd}
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
  parentDiv?: HTMLDivElement | null;
  scaleValue: number;
}

interface ITowerStyledWrapper {
  posX: number;
  posY: number;
  zIndex?: number;
  width: number;
  height: number;
}
