import React, { useEffect, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import styled from 'styled-components';
import { ModalWindow } from '../modal-window';
import { useStore } from 'effector-react';
import { AppConditionState } from '../../effector/app-condition/store';
import { Map } from '../map';
import { Buildings } from '../../buildings';
import { BuildingsService } from '../../buildings/config';
import mapTile from '../../img/map/map-tile.png';
import {
  updateScaleValue,
  ScaleValues,
} from '../../effector/app-condition/events';
import { AuthButton } from '../auth-button';

const ComponentWrapper = styled.div`
  border: solid 5px #e2d7c7;
  background-image: url("${mapTile}");
  background-repeat: repeat;
  background-size: auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const ScrollContainerStyle = {
  height: '100%',
  width: '100%',
};
const MapWrapper = styled.div<{ scaleValue: number }>`
  display: block;
  width: 7680px;
  height: 5400px;
  position: relative;
  transform: scale(${props => props.scaleValue});
`;

const styleConfig = {
  button1: {
    position: 'fixed',
    top: '10%',
    width: '100px',
    height: '98px',
    zIndex: 100,
    left: '10%',
  } as React.CSSProperties,
  button2: {
    position: 'fixed',
    top: '10%',
    width: '100px',
    height: '98px',
    zIndex: 100,
    left: '20%',
  } as React.CSSProperties,
};
export const RootComponent = (): React.ReactElement => {
  const { isModalWindowOpen, scaleValue, focusOn } = useStore(
    AppConditionState
  );
  const localBuildingService = new BuildingsService();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myRef: any = useRef<HTMLElement>(null);

  useEffect(() => {
    if (myRef.current) {
      const {
        coords: [cordX, cordY],
      } = localBuildingService.getConfigForTower(focusOn);
      const scrollContainerNode = myRef.current.container.current;
      if (scrollContainerNode) scrollContainerNode.scrollTo(cordX, cordY);
    }
  }, [isModalWindowOpen]);
  return (
    <ComponentWrapper id="rootScroll">
      <AuthButton />
      <button
        style={styleConfig.button1}
        onClick={() => {
          updateScaleValue(ScaleValues.HALF);
        }}
      >
        0.5 SCALE
      </button>
      <button
        style={styleConfig.button2}
        onClick={() => {
          updateScaleValue(ScaleValues.ORIGIN);
        }}
      >
        1 SCALE
      </button>

      {isModalWindowOpen ? <ModalWindow /> : ''}
      <ScrollContainer
        ref={myRef}
        style={ScrollContainerStyle}
        nativeMobileScroll={false}
        onEndScroll={(...args) => {
          // eslint-disable-next-line no-console
          console.log('onEndScroll', args);
        }}
      >
        <MapWrapper scaleValue={scaleValue}>
          <Map />
          <Buildings />
        </MapWrapper>
      </ScrollContainer>
    </ComponentWrapper>
  );
};
