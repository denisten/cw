import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { extraTowerInfoModalOpened } from '../../effector/app-condition/events';
// import { LazyImage } from '@tsareff/lazy-image'; // TODO uncomment after fixing @tsareff/lazy-image lib
import { TowersTypes } from '../../effector/towers-progress/store';
import { UpdateButton } from '../update-button';
import { Substrate } from '../substrate';
import { upgradeTower } from '../../effector/towers-progress/events';
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
  update,
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

  const handleClick = () => {
    extraTowerInfoModalOpened({
      coords: towerCoords,
      towerTitle,
    });
  };

  useEffect(() => mouseOverHandle(), [focusOnTowerTitle]);

  useEffect(() => {
    if (update) {
      setTimeout(() => {
        upgradeTower(towerTitle);
      }, upgradeTowerDelay);
    }
  });
  return (
    <TowerStyledWrapper
      posX={posX}
      posY={posY}
      zIndex={zIndex}
      width={width}
      height={height}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
      {progress === 100 ? <UpdateButton towerTitle={towerTitle} /> : ''}
      {update ? <Substrate width={width} height={height} /> : ''}
      {/*<LazyImage*/}
      {/*  src={tower}*/}
      {/*  alt="tower"*/}
      {/*  useMap={'#' + tower}*/}
      {/*  style={StyledConfig}*/}
      // TODO uncomment after fixing @tsareff/lazy-image lib
      {/*/>*/}
      <img src={tower} alt="tower" useMap={'#' + tower} style={StyledConfig} />
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
      {hoverState ? <img src={shadowImg} alt="shadow" /> : ''}
    </TowerStyledWrapper>
  );
};

type TypeWrapperProps = {
  towerCoords: number[];
  position: number[];
  areaCoords: string;
  shadowImg: string;
  tower: string;
  width: number;
  height: number;
  zIndex?: number;
  towerTitle: TowersTypes;
  focusOnTowerTitle: TowersTypes | null;
  progress: number;
  update: boolean;
};

type TowerStyledWrapperProps = {
  posX: number;
  posY: number;
  zIndex?: number;
  width: number;
  height: number;
};
