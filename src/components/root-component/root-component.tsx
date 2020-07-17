import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { AppConditionStore } from '../../effector/app-condition/store';
import mapTile from '../../img/roads/map-tile.png';

import {
  TutorialStore,
  TutorialConditions,
} from '../../effector/tutorial-store/store';
import { ScrollContainer } from '../scroll-container';
import { TutorialOverlay } from '../tutorial-overlay';
import { zIndexForInheritOverlay } from '../../constants';
import { IDisplayFlag } from '../skip-tutorial';
const Menu = lazy(() => import('../menu'));
const InitTutorialSlider = lazy(() => import('../tutorial-slider/init-slider'));
const UIButtonInterface = lazy(() => import('../UI-buttons-interface'));
const MoveCoinCollection = lazy(() => import('../move-coin-collection'));
const TowerInfo = lazy(() => import('../tower-info'));
const TutorialToolsSelector = lazy(() =>
  import('../../utils/arrows-container')
);

// import { SkipTutorial } from '../skip-tutorial';

const RootComponentWrapper = styled.div<IDisplayFlag>`
  background-image: url(${mapTile});
  background-repeat: repeat;
  background-size: auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  visibility: ${props => (props.displayFlag ? 'visible' : 'hidden')};
`;

const LoadingHideBlock = styled.div`
  width: 0px;
  height: 0px;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
`;

export const RootComponent = () => {
  const { DOMLoaded, tutorialSliderDisplayFlag } = useStore(AppConditionStore);
  // const [showSkipTutorialUI, setShowSkipTutorialUI] = useState(true);
  const { tutorialCondition } = useStore(TutorialStore);
  const tutorialIsEnabled = DOMLoaded && tutorialCondition !== 0;

  return (
    <RootComponentWrapper id="rootScroll" displayFlag={DOMLoaded}>
      <Suspense fallback={<LoadingHideBlock />}>
        <UIButtonInterface />
        {tutorialSliderDisplayFlag && <InitTutorialSlider />}
        {DOMLoaded && (
          <>
            <MoveCoinCollection />
            <TowerInfo />
            <Menu />
          </>
        )}
        {tutorialIsEnabled && (
          <TutorialToolsSelector
            tutorialCondition={tutorialCondition}
            isInsideScrollContainer={false}
          />
        )}
      </Suspense>

      {/* <SkipTutorial
        displayFlag={showSkipTutorialUI}
        setDisplayFlag={() => setShowSkipTutorialUI(!showSkipTutorialUI)}
      /> */}
      <ScrollContainer
        tutorialCondition={tutorialCondition}
        zIndex={
          tutorialCondition === TutorialConditions.ARROW_TOWER_INFO
            ? zIndexForInheritOverlay + 1
            : 0
        }
      />
      <TutorialOverlay
        displayFlag={
          tutorialCondition ===
            TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME ||
          tutorialCondition === TutorialConditions.PULSE_MENU_AUTH
        }
        zIndex={zIndexForInheritOverlay}
      />
    </RootComponentWrapper>
  );
};
