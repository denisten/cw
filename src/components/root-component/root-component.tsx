import React, { useEffect } from 'react';
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
import { InitTutorialSlider } from '../tutorial-slider/init-slider';
import { Menu } from '../menu';
import { useAudio } from '../../hooks/use-sound';
import UIButtonInterface from '../UI-buttons-interface';
import MoveCoinCollection from '../move-coin-collection';
import TowerInfo from '../tower-info';
import Encyclopedia from '../encyclopedia';
import Shop from '../shop';
import TutorialToolsSelector from '../../utils/arrows-container';
import { SettingsStore } from '../../effector/settings/store';
import backgroundMusic from '../../sound/test.mp3';
import { TowerUpgradeAnimation } from '../../UI/tower-upgrade-animation';
// import { SkipTutorial } from '../skip-tutorial';

const RootComponentWrapper = styled.div.attrs({ id: 'rootScroll' })<
  IDisplayFlag
>`
  background-image: url(${mapTile});
  background-repeat: repeat;
  background-size: auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  visibility: ${props => (props.displayFlag ? 'visible' : 'hidden')};
`;

const checkTutorialCondition = (tutorialCondition: TutorialConditions) =>
  tutorialCondition === TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME ||
  tutorialCondition === TutorialConditions.PULSE_MENU_AUTH;

const defineScrollContainerZIndex = (tutorialCondition: TutorialConditions) =>
  tutorialCondition === TutorialConditions.ARROW_TOWER_INFO
    ? zIndexForInheritOverlay + 1
    : 0;

export const RootComponent = () => {
  const { DOMLoaded, tutorialSliderDisplayFlag } = useStore(AppConditionStore);
  // const [showSkipTutorialUI, setShowSkipTutorialUI] = useState(true);
  const { tutorialCondition } = useStore(TutorialStore);
  const tutorialIsEnabled = DOMLoaded && tutorialCondition !== 0;
  const displayFlag = checkTutorialCondition(tutorialCondition);
  const zIndex = defineScrollContainerZIndex(tutorialCondition);
  const { start, stop } = useAudio(backgroundMusic);
  const { music } = useStore(SettingsStore);

  useEffect(() => {
    music ? start() : stop();
  }, [music]);
  return (
    <RootComponentWrapper displayFlag={DOMLoaded}>
      <TowerUpgradeAnimation />
      <UIButtonInterface />
      <Menu />
      {tutorialSliderDisplayFlag && <InitTutorialSlider />}
      {DOMLoaded && (
        <>
          <MoveCoinCollection />
          <TowerInfo />
          <Encyclopedia />
          <Shop />
        </>
      )}
      {tutorialIsEnabled && (
        <TutorialToolsSelector
          tutorialCondition={tutorialCondition}
          isInsideScrollContainer={false}
        />
      )}

      {/* <SkipTutorial
        displayFlag={showSkipTutorialUI}
        setDisplayFlag={() => setShowSkipTutorialUI(!showSkipTutorialUI)}
      /> */}
      <ScrollContainer tutorialCondition={tutorialCondition} zIndex={zIndex} />
      <TutorialOverlay
        displayFlag={displayFlag}
        zIndex={zIndexForInheritOverlay}
      />
    </RootComponentWrapper>
  );
};
