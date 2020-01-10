import React, {useState} from 'react'
import styled from "styled-components";
import tower from './building-1.png'
import shadow from './shadow.png'
import {toggleModalWindow} from "../../../effector/app-condition/events";
import {TowerWrapper} from "../../../UI/tower-wrapper";
const FirstTowerWrapper = styled.div`
display: block;
  position: absolute;
  top: 12%;
  left: 37%;
  vertical-align: top;
`;

export const FirstTower = () => {
    const [hoverState, setHoverState ] = useState(false);
    return(
        <FirstTowerWrapper>
            <TowerWrapper src={tower} alt="tower1" useMap="#image-map"  />
            <map  name="image-map">
                <area alt="area" onClick={() => {
                    toggleModalWindow()
                }} onMouseOver={() => setHoverState(true)} onMouseOut={() => setHoverState(false)} coords="75,16,352,544" shape="rect"/>
            </map>
            {hoverState ? <img src={shadow} alt="shadow"/> : ''}
        </FirstTowerWrapper>
    )
};