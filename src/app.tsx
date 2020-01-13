import React, { useEffect, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import styled from 'styled-components';
import { FirstTower } from './img/buildings/first-building';
import { ModalWindow } from './components/modal-window';
import { useStore } from 'effector-react';
import { AppConditionState } from './effector/app-condition/store';
import { Map } from './components/map';
import { LazyImage } from '@tsareff/lazy-image';
import map11 from './img/map/1.1.png';
import './style.css';
import cat from './img/buildings/first-building/cat.png';

const ComponentWrapper = styled.div`
  border: solid 5px #e2d7c7;
  background: #282828;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const ScrollContainerStyle = {
  height: '100%',
  width: '100%',
};

const MapWrapper = styled.div`
  display: block;
  width: 3840px;
  height: 2700px;
  position: relative;
`;

const cordX = 1243,
  cordY = 533;

export const App = (): React.ReactElement => {
  const { isModalWindowOpen } = useStore(AppConditionState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myRef: any = useRef<HTMLElement>(null);
  useEffect(() => {
    if (myRef.current) {
      const scrollContainerNode = myRef.current.container.current;
      if (scrollContainerNode) scrollContainerNode.scrollTo(cordX, cordY);
    }
    console.log('asdf');
    debugger;
  }, [isModalWindowOpen]);
  return (
    <ComponentWrapper>
      {isModalWindowOpen ? <ModalWindow /> : ''}
      <ScrollContainer
        ref={myRef}
        style={ScrollContainerStyle}
        nativeMobileScroll={false}
        onStartScroll={(...args): void => {
          // eslint-disable-next-line no-console
          console.log('onStartScroll', args);
        }}
        onScroll={(...args): void => {
          // eslint-disable-next-line no-console
          console.log('onScroll', args);
        }}
        onEndScroll={(...args): void => {
          // eslint-disable-next-line no-console
          console.log('onEndScroll', args);
        }}
      >
        <MapWrapper>
          <Map />
          <FirstTower />
          <LazyImage
            src="https://www.tokkoro.com/picsup/3009691-adorable_animal_cat_green-eyes_kitty_tabby_whiskers.jpg"
            className="test"
          />
        </MapWrapper>
      </ScrollContainer>
    </ComponentWrapper>
  );
};
