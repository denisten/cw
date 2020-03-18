import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { extraTowerInfoModalOpened } from '../../effector/app-condition/events';
import { LazyImage } from '@tsareff/lazy-image';
import { TowerLevel, TowersTypes } from '../../effector/towers-progress/store';
import { UpgradeButton } from '../update-button';
import { Substrate } from '../substrate';
import { upgradeTower } from '../../effector/towers-progress/events';
import { maxProgressValue } from '../../effector/app-condition/store';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { useStore } from 'effector-react';

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
}): React.ReactElement => {
  const [posX, posY] = position;
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

  const { tutorialPause } = useStore(TutorialStore);

  const handleClick = () => {
    if (
      tutorialCondition === TutorialConditions.ARROW_TOWER_INFO &&
      tutorialTower
    ) {
      extraTowerInfoModalOpened({
        coords: towerCoords,
        towerTitle,
      });
      nextTutorStep();
    } else if (!tutorialCondition || tutorialPause) {
      extraTowerInfoModalOpened({
        coords: towerCoords,
        towerTitle,
      });
    }
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
          onClick={handleClick}
          onMouseOver={() => setHoverState(true)}
          onMouseOut={mouseOverHandle}
          coords={areaCoords}
          shape="rect"
        />
      </map>
      {hoverState ? <img src={shadowImg} alt="shadow" /> : null}
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
};

type TowerStyledWrapperProps = {
  posX: number;
  posY: number;
  zIndex?: number;
  width: number;
  height: number;
};
