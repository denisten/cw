import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import tower from './img/buildings/building-1.png'
import styled from "styled-components";
import map from './img/map/map.png'

const ComponentWrapper = styled.div`
  border: solid 5px #E2D7C7;
  background: #282828;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const ScrollContainerStyle = {
  height: "100%",
  width: "100%"
};

const MapWrapper = styled.div`
  background-image: url(${map});
  display: block;
  width: 5000px;
  height: 5000px;
  border: 2px solid;
  background-repeat: repeat;
  position: relative;
  top: 0;
  left: 0;
`;

const FirstTower = styled.img`
  position: absolute;
  top: 12%;
  left: 37%;
`;



export const App = () => {
        return (
            <ComponentWrapper>
                <ScrollContainer
                    style={ScrollContainerStyle}
                    nativeMobileScroll={false}
                    onStartScroll={(...args) => { console.log('onStartScroll', args) }}
                    onScroll={(...args) => { console.log('onScroll', args) }}
                    onEndScroll={(...args) => { console.log('onEndScroll', args) }}
                >
                    <MapWrapper>
                        <FirstTower src={tower} alt="tower"/>
                    </MapWrapper>
                </ScrollContainer>
            </ComponentWrapper>
        )
}
