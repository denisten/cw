import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import { useCheckDisableTutorial } from '../../hooks/use-check-disable-tutorial';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TutorialToolsSelector } from '../../utils/arrows-container';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { Planes } from '../planes';
import { Cars } from '../cars/carsArray';
import { Map } from '../map';
import { Buildings } from '../../buildings';
import { Bridges } from '../../buildings/bridges';
import { BuildingsService } from '../../buildings/config';
import { Waves } from '../waves';
import { Decorations } from '../decorations';
import { CentralBanner } from '../central-banner';
import { useInitDragscroll } from '../../hooks/use-init-dragscroll';
import { scrollToCurrentTower } from '../../utils/scroll-to-current-tower';

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
const MapWrapper = styled.div<IMapWrapper>`
  display: block;
  width: ${MapSize.WIDTH}px;
  height: ${MapSize.HEIGHT}px;
  position: relative;
  transform: scale(${props => props.scaleValue});
  z-index: ${props => props.zIndex};
`;

const _scrollContainerClassName = 'dragscroll';

const scrollToCurrentTowerOptions = {
  behavior: 'smooth',
  block: 'start',
  inline: 'center',
} as ScrollIntoViewOptions;

export const ScrollContainer: React.FC<{
  tutorialCondition: TutorialConditions;
  zIndex: number;
}> = React.memo(({ tutorialCondition, zIndex }) => {
  const scrollContainerWrapperRef = useRef<HTMLDivElement>(null);

  const { scaleValue } = useStore(AppCondition);
  const { ref } = BuildingsService.getConfigForTower(TowersTypes.MY_MTS);

  useInitDragscroll();
  useCheckDisableTutorial([]);

  useEffect(() => {
    scrollToCurrentTower(ref, scrollToCurrentTowerOptions);
  }, [ref]);

  return (
    <ScrollContainerWrapper
      className={_scrollContainerClassName}
      ref={scrollContainerWrapperRef}
    >
      <MapWrapper scaleValue={scaleValue} zIndex={zIndex}>
        <TutorialToolsSelector
          tutorialCondition={tutorialCondition}
          isInsideScrollContainer={true}
        />
        <Planes />
        <Cars />
        <Map />
        <Buildings />
        <Waves />
        <Decorations />
        <CentralBanner />
        <Bridges showBridges={true} />
      </MapWrapper>
    </ScrollContainerWrapper>
  );
});

interface IMapWrapper {
  scaleValue: number;
  zIndex: number;
}
