import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
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
import { ZoomInOutButtons } from '../../UI/zoom-in-out-buttons';
import dragscroll from 'dragscroll';

export enum ScaleValues {
  ZOOM_IN = 0.05,
  ZOOM_OUT = -0.05,
  MAX_SCALE = 1.5,
  MIN_SCALE = 1,
  FIX_SIZE = 0.3,
}

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
  z-index: ${props => props.zIndex};
`;

const _scrollContainerClassName = 'dragscroll';

const scrollToCurrentTowerOptions = {
  behavior: 'smooth',
  block: 'start',
  inline: 'center',
} as ScrollIntoViewOptions;

const _smoothScrollValue = -0.005;

export const ScrollContainer: React.FC<{
  tutorialCondition: TutorialConditions;
  zIndex: number;
}> = React.memo(({ tutorialCondition, zIndex }) => {
  const scrollContainerWrapperRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const scaleValue = useRef(1);
  const { ref } = BuildingsService.getConfigForTower(TowersTypes.MY_MTS);

  const runScrollAnimation = () => {
    if (mapWrapperRef.current)
      mapWrapperRef.current.style.transform = `scale(${scaleValue.current})`;
  };

  const scaleHandler = (payload: number) => {
    if (scaleValue.current === ScaleValues.FIX_SIZE) {
      scaleValue.current = ScaleValues.MIN_SCALE;
      runScrollAnimation();
      scrollContainerWrapperRef.current?.classList.add(
        _scrollContainerClassName
      );
      dragscroll.reset();
      return;
    }

    if (payload < 0 && scaleValue.current + payload < ScaleValues.MIN_SCALE) {
      scaleValue.current = ScaleValues.FIX_SIZE;
      const { ref } = BuildingsService.getConfigForTower(TowersTypes.THEATER);
      runScrollAnimation();
      scrollToCurrentTower(ref, {
        ...scrollToCurrentTowerOptions,
        block: 'center',
      });

      scrollContainerWrapperRef.current?.classList.remove(
        _scrollContainerClassName
      );

      dragscroll.reset();
    }

    if (
      (payload < 0 && scaleValue.current + payload >= ScaleValues.MIN_SCALE) ||
      (payload > 0 && scaleValue.current + payload <= ScaleValues.MAX_SCALE)
    ) {
      scaleValue.current += payload;
      runScrollAnimation();
    }
  };

  const wheelHandler = (e: React.WheelEvent) => {
    e.persist();
    requestAnimationFrame(() => {
      e.preventDefault();
      scaleHandler(e.deltaY * _smoothScrollValue);
    });
  };

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
      <ZoomInOutButtons callback={scaleHandler} />
      <MapWrapper ref={mapWrapperRef} zIndex={zIndex} onWheel={wheelHandler}>
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
        <CentralBanner tutorialCondition={tutorialCondition} />
        <Bridges showBridges={true} />
      </MapWrapper>
    </ScrollContainerWrapper>
  );
});

interface IMapWrapper {
  scaleValue?: number;
  zIndex: number;
}
