import React, { useEffect, useRef } from 'react';
import dragscroll from 'dragscroll';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import { useCheckDisableTutorial } from '../../hooks/useCheckDisableTutorial';
import { TowersProgressStore } from '../../effector/towers-progress/store';
import { scrollToCurrentTower } from '../../utils/scroll-to-current-tower';
import { zoomInOut } from '../../utils/zoomInOut';
import { TutorialToolsSelector } from '../../utils/arrows-container';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { Planes } from '../planes';
import { Cars } from '../cars/carsArray';
import { Map } from '../map';
import { Buildings } from '../../buildings';
import { Bridges } from '../../buildings/bridges';

export enum MapSize {
  WIDTH = 7680,
  HEIGHT = 5400,
}
const ScrollContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  user-select: none;
`;
const MapWrapper = styled.div<{ scaleValue: number }>`
  display: block;
  width: ${MapSize.WIDTH}px;
  height: ${MapSize.HEIGHT}px;
  position: relative;
  transform: scale(${props => props.scaleValue});
`;

export const ScrollContainer: React.FC<{
  tutorialCondition: TutorialConditions;
}> = React.memo(({ tutorialCondition }) => {
  const myRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dragscroll.reset();
  }, []);
  const { scaleValue } = useStore(AppCondition);

  const { ref } = useStore(TowersProgressStore).mainTower;
  useCheckDisableTutorial([]);
  useEffect(() => {
    scrollToCurrentTower(ref);
  }, [ref]);

  const wheelHandler = (e: React.WheelEvent) => {
    zoomInOut(e.deltaY, scaleValue);
  };

  return (
    <ScrollContainerWrapper className="dragscroll" ref={myRef}>
      <MapWrapper onWheel={wheelHandler} scaleValue={scaleValue}>
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
    </ScrollContainerWrapper>
  );
});
