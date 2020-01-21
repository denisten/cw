import React, { useState } from 'react';
import styled from 'styled-components';
import { extraTowerInfoModalOpened } from '../../effector/app-condition/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { LazyImage } from '@tsareff/lazy-image';
const TowerStyledWrapper = styled.div<TowerStyledWrapperProps>`
  display: block;
  position: absolute;
  top: ${props => props.posX}%;
  left: ${props => props.posY}%;
  vertical-align: top;
`;

export const TowerWrapper: React.FC<TypeWrapperProps> = ({
  position,
  areaCoords,
  shadowImg,
  tower,
  towerType,
  height,
  width,
}): React.ReactElement => {
  const [posX, posY] = position;
  const [hoverState, setHoverState] = useState(false);
  const towerSize = {
    width: `${width}px`,
    height: `${height}px`,
    position: 'absolute',
  } as React.CSSProperties;
  return (
    <TowerStyledWrapper posX={posX} posY={posY}>
      <LazyImage
        src={tower}
        alt="tower"
        useMap={'#' + tower}
        style={towerSize}
      />
      <map name={tower}>
        <area
          alt="area"
          onClick={() => {
            extraTowerInfoModalOpened(towerType);
          }}
          onMouseOver={() => setHoverState(true)}
          onMouseOut={() => setHoverState(false)}
          coords={areaCoords}
          shape="rect"
        />
      </map>
      {hoverState ? <img src={shadowImg} alt="shadow" /> : ''}
    </TowerStyledWrapper>
  );
};

type TypeWrapperProps = {
  towerType: TowersTypes;
  position: number[];
  areaCoords: string;
  shadowImg: string;
  tower: string;
  width: number;
  height: number;
};

type TowerStyledWrapperProps = {
  posX: number;
  posY: number;
};
