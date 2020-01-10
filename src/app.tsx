import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import styled from "styled-components";
import map from './img/map/map.png'
import {FirstTower} from "./img/buildings/first-building";
import {ModalWindow} from "./components/modal-window";
import {useStore} from "effector-react";
import {AppConditionState} from "./effector/app-condition/store";

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
  background-repeat: repeat;
  position: relative;
  top: 0;
  left: 0;
`;



export const App = () => {

    const {isModalWindowOpen} = useStore(AppConditionState);

        return (
            <ComponentWrapper>
                {isModalWindowOpen ? <ModalWindow/> : ''}
                <ScrollContainer
                    style={ScrollContainerStyle}
                    nativeMobileScroll={false}
                    onStartScroll={(...args) => { console.log('onStartScroll', args) }}
                    onScroll={(...args) => { console.log('onScroll', args) }}
                    onEndScroll={(...args) => { console.log('onEndScroll', args) }}
                >
                    <MapWrapper>
                        <FirstTower/>
                    </MapWrapper>
                </ScrollContainer>
            </ComponentWrapper>
        )
}
