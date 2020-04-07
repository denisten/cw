import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { TowerInfo } from '../tower-info';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import { Map } from '../map';
import { Buildings } from '../../buildings';
import mapTile from '../../img/roads/map-tile.png';
import { Menu } from '../profile-modal-window';
import { TaskButton } from '../../UI/task-button';
import { Bridges } from '../../buildings/bridges';
import { ProfileButton } from '../../UI/profile-button';
import { TutorialToolsSelector } from '../../utils/arrows-container';
import { Cars } from '../cars/carsArray';
import { useCheckDisableTutorial } from '../../hooks/useCheckDisableTutorial';
import { Planes } from '../planes';
import { TutorialStore } from '../../effector/tutorial-store/store';
import { ScrollContainer } from '../scroll-container';
import { coordsLogger } from '../../utils/coords-logger';
import { scrollToCurrentTower } from '../../utils/scroll-to-current-tower';
import { TowersProgressStore } from '../../effector/towers-progress/store';
import { ZoomInOutButtons } from '../../UI/zoom-in-out-buttons';
import { zoomInOut } from '../../utils/zoomInOut';

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

export const RootComponent = (): React.ReactElement => {
  const { isExtraTowerInfoModalOpen, selectedMenuItem, scaleValue } = useStore(
    AppCondition
  );

  const { tutorialCondition, tutorialPause } = useStore(TutorialStore);
  const { ref } = useStore(TowersProgressStore).mainTower;
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  useCheckDisableTutorial([]);
  useEffect(() => {
    scrollToCurrentTower(ref);
  }, [ref]);

  const wheelHandler = (e: React.WheelEvent) => {
    zoomInOut(e.deltaY, scaleValue);
  };

  return (
    <ComponentWrapper id="rootScroll">
      <Menu displayFlag={!!selectedMenuItem} />
      <ProfileButton
        tutorialCondition={tutorialCondition}
        tutorialPause={tutorialPause}
      />
      <ZoomInOutButtons scaleValue={scaleValue}></ZoomInOutButtons>
      <TaskButton />
      <TowerInfo opened={isExtraTowerInfoModalOpen} />
      <TutorialToolsSelector
        tutorialCondition={tutorialCondition}
        isInsideScrollContainer={false}
      />
      <ScrollContainer>
        <MapWrapper
          onWheel={wheelHandler}
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
          <Buildings />
          <Bridges showBridges={true} />
        </MapWrapper>
      </ScrollContainer>
    </ComponentWrapper>
  );
};
