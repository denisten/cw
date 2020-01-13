import React, { useState } from 'react';
import styled from 'styled-components';
import tower from './building-1.png';
import shadow from './shadow.png';
import { toggleModalWindow } from '../../../effector/app-condition/events';
import { TowerWrapper } from '../../../UI/tower-wrapper';
const FirstTowerWrapper = styled.div`
  display: block;
  position: absolute;
  top: 28.5%;
  left: 45.8%;
  vertical-align: top;
`;

export const FirstTower = (): React.ReactElement => {
  const [hoverState, setHoverState] = useState(false);
  return (
    <FirstTowerWrapper>
      <TowerWrapper src={tower} alt="tower1" useMap="#image-map" />
      <map name="image-map">
        <area
          alt="area"
          onClick={(): void => {
            toggleModalWindow();
          }}
          onMouseOver={(): void => setHoverState(true)}
          onMouseOut={(): void => setHoverState(false)}
          coords="135,18,30,294"
          shape="rect"
        />
      </map>
      {hoverState ? <img src={shadow} alt="shadow" /> : ''}
    </FirstTowerWrapper>
  );
};
