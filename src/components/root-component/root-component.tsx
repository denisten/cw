import React, { useRef, useState } from 'react';
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
import { Bridges } from '../../buildings/bridges';
import { ProfileButton } from '../../UI/profile-button';
import { TutorialToolsSelector } from '../../utils/arrows-container';
import { Cars } from '../cars/carsArray';
import { useCheckDisableTutorial } from '../../hooks/useCheckDisableTutorial';
import { Planes } from '../planes';
import { TutorialStore } from '../../effector/tutorial-store/store';
import { ScrollContainer } from '../scroll-container';
import { coordsLogger } from '../../utils/coords-logger';
import {
  updateScaleValue,
  ScaleValues,
} from '../../effector/app-condition/events';
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

  const { tutorialCondition, tutorialPause } = useStore(TutorialStore);
  const [cordX, cordY] = focusOn.coords;
  const scrollCoords = [
    cordX - window.innerWidth / divideNumber.WIDTH,
    cordY - window.innerHeight / divideNumber.HEIGHT,
  ];
  const [scrollNode, setScrollNode] = useState(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  useScrollTo(scrollNode, scrollCoords, [isExtraTowerInfoModalOpen]);
  useCheckDisableTutorial([]);

  const mapScale = (e: React.WheelEvent) => {
    if (
      e.deltaY < 0 &&
      scaleValue + ScaleValues.SCALE_STEP <= ScaleValues.MAX_SCALE
    ) {
      updateScaleValue(ScaleValues.SCALE_STEP);
    } else if (
      e.deltaY > 0 &&
      scaleValue - ScaleValues.SCALE_STEP >= ScaleValues.MIN_SCALE
    ) {
      updateScaleValue(-ScaleValues.SCALE_STEP);
    }
  };

  return (
    <ComponentWrapper id="rootScroll" onWheel={mapScale}>
      <Menu displayFlag={!!selectedMenuItem} />
      <ProfileButton
        tutorialCondition={tutorialCondition}
        tutorialPause={tutorialPause}
      />
      <TaskButton />
      <TowerInfo opened={isExtraTowerInfoModalOpen} />
      <TutorialToolsSelector
        tutorialCondition={tutorialCondition}
        isInsideScrollContainer={false}
      />
      <ScrollContainer onMountCallback={setScrollNode}>
        <MapWrapper
          scaleValue={scaleValue}
          onClick={e => {
            if (mapWrapperRef.current) coordsLogger(e, mapWrapperRef.current);
          }}
          ref={mapWrapperRef}
        >
          <TutorialToolsSelector
            tutorialCondition={tutorialCondition}
            isInsideScrollContainer={true}
          />
          <Planes />
          <Cars />
          <Map />
          <Buildings parentDiv={mapWrapperRef.current} />
          <Bridges showBridges={true} />
        </MapWrapper>
      </ScrollContainer>
    </ComponentWrapper>
  );
};
