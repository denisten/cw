import React, { useState } from 'react';
import styled from 'styled-components';
import { toggleModalWindow } from '../../effector/app-condition/events';
import { TowerImgWrapper } from '../../UI/tower-img-wrapper';
import { TowersTypes } from '../../effector/towers-progress/store';
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
}): React.ReactElement => {
  const [posX, posY] = position;
  const [hoverState, setHoverState] = useState(false);
  return (
    <TowerStyledWrapper posX={posX} posY={posY}>
      <TowerImgWrapper src={tower} alt="tower" useMap={'#' + tower} />
      <map name={tower}>
        <area
          alt="area"
          onClick={(): void => {
            toggleModalWindow(towerType);
          }}
          onMouseOver={(): void => setHoverState(true)}
          onMouseOut={(): void => setHoverState(false)}
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
};

type TowerStyledWrapperProps = {
  posX: number;
  posY: number;
};
