import React, { useEffect, useRef } from 'react';
import dragscroll from 'dragscroll';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import { useCheckDisableTutorial } from '../../hooks/useCheckDisableTutorial';
import { TowersTypes } from '../../effector/towers-progress/store';
import { scrollToCurrentTower } from '../../utils/scroll-to-current-tower';
import { zoomInOut } from '../../utils/zoomInOut';
import { TutorialToolsSelector } from '../../utils/arrows-container';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { Planes } from '../planes';
import { Cars } from '../cars/carsArray';
import { Map } from '../map';
import { Buildings } from '../../buildings';
import { Bridges } from '../../buildings/bridges';
import { BuildingsService } from '../../buildings/config';

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
const MapWrapper = styled.div<{ scaleValue: number; zIndex: number }>`
  display: block;
  width: ${MapSize.WIDTH}px;
  height: ${MapSize.HEIGHT}px;
  position: relative;
  transform: scale(${props => props.scaleValue});
  z-index: ${props => props.zIndex};
`;

export const ScrollContainer: React.FC<{
  tutorialCondition: TutorialConditions;
  zIndex: number;
}> = React.memo(({ tutorialCondition, zIndex }) => {
  const myRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dragscroll.reset();
  }, []);
  const { scaleValue } = useStore(AppCondition);
  const { ref } = BuildingsService.getConfigForTower(TowersTypes.MY_MTS);
  useCheckDisableTutorial([]);
  useEffect(() => {
    scrollToCurrentTower(ref, {
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
  }, [ref]);

  const wheelHandler = (e: React.WheelEvent) => {
    zoomInOut(e.deltaY, scaleValue);
  };

  return (
    <ScrollContainerWrapper className="dragscroll" ref={myRef}>
      <MapWrapper
        onWheel={wheelHandler}
        scaleValue={scaleValue}
        zIndex={zIndex}
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
    </ScrollContainerWrapper>
  );
});
