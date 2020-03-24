import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { extraTowerInfoModalOpened } from '../../effector/app-condition/events';
import { LazyImage } from '@tsareff/lazy-image';
import { TowerLevel, TowersTypes } from '../../effector/towers-progress/store';
import { UpgradeButton } from '../update-button';
import { Substrate } from '../substrate';
import { upgradeTower } from '../../effector/towers-progress/events';
import { maxProgressValue } from '../../effector/app-condition/store';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';

const TowerStyledWrapper = styled.div<TowerStyledWrapperProps>`
  display: block;
  position: absolute;
  top: ${props => props.posX}%;
  left: ${props => props.posY}%;
  z-index: ${props => props.zIndex};
  vertical-align: top;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const upgradeTowerDelay = 1500;
const minDifBetweenMouseEvents = 120;

export const TowerWrapper: React.FC<TypeWrapperProps> = ({
  position,
  tutorialCondition,
  maxLevel,
  currentLevel,
  areaCoords,
  shadowImg,
  tower,
  height,
  width,
  towerCoords,
  zIndex,
  towerTitle,
  focusOnTowerTitle,
  progress,
  upgradeFlag,
  tutorialTower,
  tutorialPause,
}): React.ReactElement => {
  const [posX, posY] = position;
  let mouseDownDate: number = +new Date(0),
    mouseUpDate: number = +new Date(0);
  const [hoverState, setHoverState] = useState(false);
  const StyledConfig = {
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
      extraTowerInfoModalOpened({
        coords: towerCoords,
        towerTitle,
      });
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

  useEffect(() => mouseOverHandle(), [focusOnTowerTitle]);

  useEffect(() => {
    if (upgradeFlag) {
      setTimeout(() => {
        upgradeTower(towerTitle);
        if (tutorialCondition) nextTutorStep();
      }, upgradeTowerDelay);
    }
  }, [upgradeFlag]);
  return (
    <TowerStyledWrapper
      posX={posX}
      posY={posY}
      zIndex={zIndex}
      width={width}
      height={height}
    >
      {progress >= maxProgressValue && currentLevel < maxLevel ? (
        <UpgradeButton
          towerTitle={towerTitle}
          animFlag={
            tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO
          }
        />
      ) : null}
      {upgradeFlag ? <Substrate width={width} height={height} /> : ''}
      <LazyImage
        src={tower}
        alt="tower"
        useMap={'#' + tower}
        style={StyledConfig}
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
};

type TypeWrapperProps = {
  towerCoords: number[];
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
};

type TowerStyledWrapperProps = {
  posX: number;
  posY: number;
  zIndex?: number;
  width: number;
  height: number;
};
