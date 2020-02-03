import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { extraTowerInfoModalOpened } from '../../effector/app-condition/events';
import { LazyImage } from '@tsareff/lazy-image';
import { TowersTypes } from '../../effector/towers-progress/store';
const TowerStyledWrapper = styled.div<TowerStyledWrapperProps>`
  display: block;
  position: absolute;
  top: ${props => props.posX}%;
  left: ${props => props.posY}%;
  z-index: ${props => props.zIndex};
  vertical-align: top;
`;

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
}): React.ReactElement => {
  const [posX, posY] = position;
  const [hoverState, setHoverState] = useState(false);
  const towerSize = {
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

  return (
    <TowerStyledWrapper posX={posX} posY={posY} zIndex={zIndex}>
      <LazyImage
        src={tower}
        alt="tower"
        useMap={'#' + tower}
        style={towerSize}
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
};

type TowerStyledWrapperProps = {
  posX: number;
  posY: number;
  zIndex?: number;
};
