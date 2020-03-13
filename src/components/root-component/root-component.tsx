import React, { useEffect, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import styled from 'styled-components';
import { TowerInfo } from '../tower-info';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import { Map } from '../map';
import { Buildings } from '../../buildings';
import mapTile from '../../img/roads/map-tile.png';
import { Menu } from '../profile-modal-window';
import { TaskButton } from '../../UI/task-button';
import { useScrollTo } from '../../hooks/useScrollTo';
import { OnEndScrollHandler } from '../../utils/on-end-scroll-handler';
import { Bridges } from '../../buildings/bridges';
import { ProfileButton } from '../../UI/profile-button';
import { TutorialToolsSelector } from '../../utils/arrows-container';
import { Cars } from '../cars/carsArray';
import { useCheckDisableTutorial } from '../../hooks/useCheckDisableTutorial';
import { Planes } from '../planes';
import { TutorialStore } from '../../effector/tutorial-store/store';

export enum MapSize {
  WIDTH = 7680,
  HEIGHT = 5400,
}

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
  width: ${MapSize.WIDTH}px;
  height: ${MapSize.HEIGHT}px;
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
    height: '5%',
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
    selectedMenuItem,
    scaleValue,
    focusOn,
  } = useStore(AppCondition);

  const { tutorialCondition } = useStore(TutorialStore);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myRef: any = useRef<HTMLElement>(null);
  const [cordX, cordY] = focusOn.coords;
  const scrollCoords = [
    cordX - window.innerWidth / divideNumber.WIDTH,
    cordY - window.innerHeight / divideNumber.HEIGHT,
  ];
  const [scrollNode, setScrollNode] = useState(null);
  useEffect(() => {
    if (myRef.current) setScrollNode(myRef.current.container.current);
  }, []);
  useScrollTo(scrollNode, scrollCoords, [isExtraTowerInfoModalOpen]);
  useCheckDisableTutorial([]);

  return (
    <ComponentWrapper id="rootScroll">
      <Menu displayFlag={!!selectedMenuItem} />
      <ProfileButton tutorialCondition={tutorialCondition} />
      <TaskButton />
      <TowerInfo opened={isExtraTowerInfoModalOpen} />
      <TutorialToolsSelector
        tutorialCondition={tutorialCondition}
        isInsideScrollContainer={false}
      />
      <ScrollContainer
        ref={myRef}
        nativeMobileScroll={false}
        onEndScroll={(...args) => {
          OnEndScrollHandler(args.slice(0, 2));
        }}
        style={styleConfig.ScrollContainerStyle}
      >
        <MapWrapper scaleValue={scaleValue}>
          <TutorialToolsSelector
            tutorialCondition={tutorialCondition}
            isInsideScrollContainer={true}
          />
          <Planes />
          <Cars />
          <Map />
          <Buildings />
          <Bridges showBridges={true} />
        </MapWrapper>
      </ScrollContainer>
    </ComponentWrapper>
  );
};
