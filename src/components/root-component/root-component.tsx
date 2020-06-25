import React, { useState } from 'react';
import styled from 'styled-components';
import { TowerInfo } from '../tower-info';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import mapTile from '../../img/roads/map-tile.png';
import { Menu } from '../menu';
import { Toolbar } from '../../UI/toolbar';
import { ProfileButton } from '../../UI/profile-button';
import { TutorialToolsSelector } from '../../utils/arrows-container';
import {
  TutorialStore,
  TutorialConditions,
} from '../../effector/tutorial-store/store';
import { ScrollContainer } from '../scroll-container';
import { TutorialOverlay } from '../tutorial-overlay';
import { zIndexForInheritOverlay } from '../../constants';
import { SkipTutorial } from '../skip-tutorial';
import { MoveCoinCollection } from '../move-coin-collection';
import { RewardStore } from '../../effector/reward/store';

const ComponentWrapper = styled.div<{ visible: boolean }>`
  background-image: url("${mapTile}");
  background-repeat: repeat;
  background-size: auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

export const RootComponent = (): React.ReactElement => {
  const { isExtraTowerInfoModalOpen, selectedMenuItem, DOMLoaded } = useStore(
    AppCondition
  );
  const { isCoinRelocateAnimationEnded } = useStore(RewardStore);

  const [showSkipTutorialUI, setShowSkipTutorialUI] = useState(true);
  const { tutorialCondition, tutorialPause } = useStore(TutorialStore);

  return (
    <ComponentWrapper id="rootScroll" visible={DOMLoaded}>
      <Menu displayFlag={!!selectedMenuItem} />
      <ProfileButton
        tutorialCondition={tutorialCondition}
        tutorialPause={tutorialPause}
        isCoinRelocateAnimationEnded={isCoinRelocateAnimationEnded}
      />
      <MoveCoinCollection />
      <Toolbar />
      <TowerInfo opened={isExtraTowerInfoModalOpen} />
      <TutorialToolsSelector
        tutorialCondition={tutorialCondition}
        isInsideScrollContainer={false}
      />
      <SkipTutorial
        displayFlag={showSkipTutorialUI}
        setDisplayFlag={() => setShowSkipTutorialUI(!showSkipTutorialUI)}
      />
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
    </ComponentWrapper>
  );
};
