import React, { useEffect, useRef, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useCheckDisableTutorial } from '../../hooks/use-check-disable-tutorial';
import { TowersTypes } from '../../effector/towers-progress/store';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { Map } from '../map';
import { Buildings } from '../../buildings';
import { Bridges } from '../../buildings/bridges';
import { BuildingsService } from '../../buildings/config';
import { useInitDragscroll } from '../../hooks/use-init-dragscroll';
import { scrollToCurrentTower } from '../../utils/scroll-to-current-tower';
import dragscroll from 'dragscroll';
import { setFullSizeMode } from '../../effector/app-condition/events';
import { useEnableSizeMod } from '../../hooks/use-enable-size-mod';
import { useStore } from 'effector-react';
import { AppConditionStore } from '../../effector/app-condition/store';
import { fixSizeClassName } from '../../UI/tower-component-wrapper';
const ZoomInOutButtons = lazy(() => import('../../UI/zoom-in-out-buttons'));
const CentralBanner = lazy(() => import('../decorations/central-banner'));
const Planes = lazy(() => import('../planes'));
const Cars = lazy(() => import('../decorations/cars/carsArray'));
const Waves = lazy(() => import('../decorations/waves'));
const Decorations = lazy(() => import('../decorations'));
const TutorialToolsSelector = lazy(() =>
  import('../../utils/arrows-container')
);

export enum ScaleValues {
  ZOOM_IN = 0.05,
  ZOOM_OUT = -0.05,
  MAX_SCALE = 1,
  MIN_SCALE = 1,
  FIX_SIZE = 0.5,
}

export enum MapSize {
  // WIDTH = 7680,
  WIDTH = 5600,
  // HEIGHT = 5400,
  HEIGHT = 2940,
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

const PointForCenterScroll = styled.div`
  position: absolute;
  top: 39.1%;
  left: 48.3%;
  width: 10px;
  height: 10px;
`;

export const _scrollContainerClassName = 'dragscroll';

const scrollToCurrentTowerOptions = {
  behavior: 'smooth',
  block: 'start',
  inline: 'center',
} as ScrollIntoViewOptions;

// const _smoothScrollValue = -0.005;

export const ScrollContainer: React.FC<{
  tutorialCondition: TutorialConditions;
  zIndex: number;
}> = React.memo(({ tutorialCondition, zIndex }) => {
  const scrollContainerWrapperRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const scaleValue = useRef(ScaleValues.MIN_SCALE);
  const centerScrollPoint = useRef(null);
  const { ref } = BuildingsService.getConfigForTower(TowersTypes.MY_MTS);
  const { isAuthorized, animationOff, DOMLoaded } = useStore(AppConditionStore);
  const tutorialIsEnabled = DOMLoaded && tutorialCondition !== 0;

  const runScrollAnimation = () => {
    if (mapWrapperRef.current)
      mapWrapperRef.current.style.transform = `scale(${scaleValue.current})`;
  };

  const enableFixSizeMod = () => {
    scaleValue.current = ScaleValues.FIX_SIZE;
    runScrollAnimation();
    scrollToCurrentTower(centerScrollPoint, {
      ...scrollToCurrentTowerOptions,
      block: 'center',
    });

    scrollContainerWrapperRef.current?.classList.remove(
      _scrollContainerClassName
    );
    scrollContainerWrapperRef.current?.classList.add(fixSizeClassName);

    dragscroll.reset();
    setFullSizeMode(true);
  };

  const disableFixSizeMod = () => {
    scaleValue.current = ScaleValues.MIN_SCALE;
    runScrollAnimation();
    scrollContainerWrapperRef.current?.classList.add(_scrollContainerClassName);
    scrollContainerWrapperRef.current?.classList.remove(fixSizeClassName);
    dragscroll.reset();
    setFullSizeMode(false);
  };

  const scaleHandler = (payload: number) => {
    if (scaleValue.current === ScaleValues.FIX_SIZE && payload > 0) {
      disableFixSizeMod();
      return;
    }

    if (
      scaleValue.current !== ScaleValues.FIX_SIZE &&
      payload < 0 &&
      scaleValue.current + payload < ScaleValues.MIN_SCALE
    ) {
      enableFixSizeMod();
      return;
    }
    if (
      (payload < 0 && scaleValue.current + payload >= ScaleValues.MIN_SCALE) ||
      (payload > 0 && scaleValue.current + payload <= ScaleValues.MAX_SCALE)
    ) {
      scaleValue.current += payload;
      runScrollAnimation();
    }
  };

  // const wheelHandler = (e: React.WheelEvent) => {
  //   e.persist();
  //   requestAnimationFrame(() => {
  //     e.preventDefault();
  //     scaleHandler(e.deltaY * _smoothScrollValue);
  //   });
  // };

  useInitDragscroll();
  useCheckDisableTutorial([]);
  useEnableSizeMod(enableFixSizeMod, isAuthorized);

  useEffect(() => {
    scrollToCurrentTower(ref, scrollToCurrentTowerOptions);
  }, [ref]);

  return (
    <ScrollContainerWrapper
      className={_scrollContainerClassName}
      ref={scrollContainerWrapperRef}
    >
      <Suspense fallback={<>loading</>}>
        {DOMLoaded && <ZoomInOutButtons callback={scaleHandler} />}
      </Suspense>
      <MapWrapper ref={mapWrapperRef} zIndex={zIndex}>
        <Map />
        <Buildings />
        <Bridges showBridges={true} />
        <PointForCenterScroll ref={centerScrollPoint} />
        <Suspense fallback={<>loading</>}>
          {DOMLoaded && (
            <>
              <Planes /> <CentralBanner tutorialCondition={tutorialCondition} />
            </>
          )}
          {DOMLoaded && !animationOff && (
            <>
              <Cars /> <Waves /> <Decorations />
            </>
          )}
          {tutorialIsEnabled && (
            <TutorialToolsSelector
              tutorialCondition={tutorialCondition}
              isInsideScrollContainer={true}
            />
          )}
        </Suspense>
      </MapWrapper>
    </ScrollContainerWrapper>
  );
});

interface IMapWrapper {
  scaleValue?: number;
  zIndex: number;
}
