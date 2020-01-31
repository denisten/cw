import React, { useEffect, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import styled from 'styled-components';
import { ModalWindow } from '../extra-tower-info-modal-window';
import { useStore } from 'effector-react';
import { AppConditionState } from '../../effector/app-condition/store';
import { Map } from '../map';
import { Buildings } from '../../buildings';
import mapTile from '../../img/map/map-tile.png';
import { ProfileButton } from '../profile-button';
import { ProfileModalWindow } from '../profile-modal-window';
import { MoneyWrapper } from '../../UI/money-wrapper';
import { TaskButton } from '../../UI/task-button';
import { TaskModalWindow } from '../task-modal-window';
import { useScrollTo } from '../../hooks/useScrollTo';
import { OnEndScrollHandler } from '../../utils/on-end-scroll-handler';

const ComponentWrapper = styled.div`
  background-image: url("${mapTile}");
  background-repeat: repeat;
  background-size: auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const MapWrapper = styled.div<{ scaleValue: number }>`
  display: block;
  width: 7680px;
  height: 5400px;
  position: relative;
  transform: scale(${props => props.scaleValue});
`;

const styleConfig = {
  ScrollContainerStyle: {
    height: '100%',
    width: '100%',
  },
  moneyWrapper: {
    zIndex: 20,
    height: 5,
    top: 5,
    left: 10,
  },
};

export enum divideNumber {
  WIDTH = 2.5,
  HEIGHT = 1.8,
}

export const RootComponent = (): React.ReactElement => {
  const {
    isExtraTowerInfoModalOpen,
    isProfileInfoModalOpen,
    isTaskModalOpen,
    scaleValue,
    focusOn,
  } = useStore(AppConditionState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myRef: any = useRef<HTMLElement>(null);
  const [cordX, cordY] = focusOn;
  const scrollCoords = [
    cordX - window.innerWidth / divideNumber.WIDTH,
    cordY - window.innerHeight / divideNumber.HEIGHT,
  ];
  const [scrollNode, setScrollNode] = useState(null);
  useEffect(() => {
    if (myRef.current) setScrollNode(myRef.current.container.current);
  }, []);
  useScrollTo(scrollNode, scrollCoords, [isExtraTowerInfoModalOpen]);

  return (
    <ComponentWrapper id="rootScroll">
      {isProfileInfoModalOpen ? <ProfileModalWindow /> : ''}
      <ProfileButton />
      <TaskButton />
      <MoneyWrapper count={9999} {...styleConfig.moneyWrapper} />

      <ModalWindow opened={isExtraTowerInfoModalOpen} />
      <TaskModalWindow opened={isTaskModalOpen} />
      <ScrollContainer
        ref={myRef}
        style={styleConfig.ScrollContainerStyle}
        nativeMobileScroll={false}
        onEndScroll={(...args) => {
          OnEndScrollHandler(args.slice(0, 2));
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
