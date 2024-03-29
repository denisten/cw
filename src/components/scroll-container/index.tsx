import React, { useEffect, useRef, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useCheckDisableTutorial } from '../../hooks/use-check-disable-tutorial';
import {
  TowersProgressStore,
  TowersTypes,
} from '../../effector/towers-progress/store';
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
import { ZoomButton } from '../../UI/zoom-button';
import { useDetectBrowser } from '../../hooks/use-detect-browser';
import { Browsers, BrowserStore } from '../../effector/browser/store';
import { CentralBanner } from '../decorations/central-banner';
import { Planes } from '../planes';
import { MTSSans } from '../../fonts';
import { ZIndexes } from '../root-component/z-indexes-enum';
const Cars = lazy(() => import('../decorations/cars/carsArray'));
const Waves = lazy(() => import('../decorations/waves'));
const Decorations = lazy(() => import('../decorations'));
const TutorialToolsSelector = lazy(() =>
  import('../../utils/arrows-container')
);

export const _scrollContainerClassName = 'dragscroll';

export enum ScaleValues {
  MAX_SCALE = 1,
  MIN_SCALE = 0.6,
  FIX_SIZE = 0.5,
}

export enum MapSize {
  WIDTH = 6741,
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
  top: 49.1%;
  left: 47.7%;
  width: 10px;
  height: 10px;
`;

const Label = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: ${ZIndexes.UI_BUTTON};
  :after {
    content: 'Мир клиента. beta v.0.1.';
    font-family: ${MTSSans.REGULAR};
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 32px;
    color: #ffffff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  }
`;

const isFirefox = (name: string | undefined) => name === Browsers.FIREFOX;

const scrollToCurrentTowerOptions = {
  behavior: 'smooth',
  block: 'start',
  inline: 'center',
} as ScrollIntoViewOptions;

export const ScrollContainer: React.FC<IScrollContainer> = ({
  tutorialCondition,
  zIndex,
}) => {
  const scrollContainerWrapperRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const scaleValue = useRef(ScaleValues.MIN_SCALE);
  const centerScrollPoint = useRef(null);

  const { ref } = BuildingsService.getConfigForTower(TowersTypes.MY_MTS);
  const { isAuthorized, animationOff, DOMLoaded, fullSizeMode } = useStore(
    AppConditionStore
  );
  const airportLevel = useStore(TowersProgressStore).roaming.level.level;
  const { browserName } = useStore(BrowserStore);

  const tutorialIsEnabled = DOMLoaded && tutorialCondition !== 0;

  const runScrollAnimation = () => {
    if (mapWrapperRef.current) {
      if (isFirefox(browserName))
        mapWrapperRef.current.style.scale = `${scaleValue.current}`;
      else mapWrapperRef.current.style.zoom = `${scaleValue.current}`;
    }
  };

  const enableFixSizeMod = () => {
    scaleValue.current = ScaleValues.FIX_SIZE;
    runScrollAnimation();
    scrollToCurrentTower(centerScrollPoint, {
      ...scrollToCurrentTowerOptions,
      block: 'center',
    });
    scrollContainerWrapperRef.current?.classList.add(fixSizeClassName);
    dragscroll.reset();
    setFullSizeMode(true);
  };

  const disableFixSizeMod = () => {
    scaleValue.current = ScaleValues.MAX_SCALE;
    runScrollAnimation();
    scrollToCurrentTower(centerScrollPoint, {
      ...scrollToCurrentTowerOptions,
      block: 'center',
    });
    scrollContainerWrapperRef.current?.classList.remove(fixSizeClassName);
    dragscroll.reset();
    setFullSizeMode(false);
  };

  useInitDragscroll();
  useCheckDisableTutorial([]);
  useEnableSizeMod(enableFixSizeMod, isAuthorized);
  useDetectBrowser();

  useEffect(() => {
    scrollToCurrentTower(ref, scrollToCurrentTowerOptions);
  }, [ref]);

  return (
    <ScrollContainerWrapper
      className={_scrollContainerClassName}
      ref={scrollContainerWrapperRef}
    >
      <ZoomButton
        fullSizeMode={fullSizeMode}
        callBack={fullSizeMode ? disableFixSizeMod : enableFixSizeMod}
      />
      <Label />
      <MapWrapper ref={mapWrapperRef} zIndex={zIndex}>
        <Map />
        <Buildings />
        <Bridges showBridges={true} />
        <PointForCenterScroll ref={centerScrollPoint} />
        <Planes airportLevel={airportLevel} />
        <CentralBanner tutorialCondition={tutorialCondition} />
        <Suspense fallback={<></>}>
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
};

interface IMapWrapper {
  zIndex: number;
}

interface IScrollContainer {
  tutorialCondition: TutorialConditions;
  zIndex: number;
}
