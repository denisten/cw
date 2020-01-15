import React, { useState } from 'react';
import styled from 'styled-components';
import { toggleModalWindow } from '../../effector/app-condition/events';
import { TowerImgWrapper } from '../../UI/tower-wrapper';
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
}): React.ReactElement => {
  const [posX, posY] = position;
  const [hoverState, setHoverState] = useState(false);

  return (
    <TowerStyledWrapper posX={posX} posY={posY}>
      <TowerImgWrapper src={tower} alt="tower" useMap="#image-map" />
      <map name="image-map">
        <area
          alt="area"
          onClick={(): void => {
            toggleModalWindow();
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
  position: number[];
  areaCoords: string;
  shadowImg: string;
  tower: string;
};

type TowerStyledWrapperProps = {
  posX: number;
  posY: number;
};
