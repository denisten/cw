import React, { useState } from 'react';
import styled from 'styled-components';
import { extraTowerInfoModalOpened } from '../../effector/app-condition/events';
import { LazyImage } from '@tsareff/lazy-image';
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
}): React.ReactElement => {
  const [posX, posY] = position;
  const [hoverState, setHoverState] = useState(false);
  const towerSize = {
    width: `${width}px`,
    height: `${height}px`,
    position: 'absolute',
  } as React.CSSProperties;
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
          onClick={() => {
            extraTowerInfoModalOpened(towerCoords);
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
  towerCoords: number[];
  position: number[];
  areaCoords: string;
  shadowImg: string;
  tower: string;
  width: number;
  height: number;
  zIndex?: number;
};

type TowerStyledWrapperProps = {
  posX: number;
  posY: number;
  zIndex?: number;
};
