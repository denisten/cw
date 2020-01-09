import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import tower from './building-1.png'
import shadow from './shadow.png'
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
            <img src={tower} alt="tower1" style={{position: "absolute", zIndex: 100}} onMouseOver={() => setHoverState(true)} onMouseOut={() => setHoverState(false)}/>
            {hoverState ? <img src={shadow} alt="shadow"/> : ''}
        </FirstTowerWrapper>
    )
};