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
// import { SkipTutorial } from '../skip-tutorial';
import { IDisplayFlag } from '../skip-tutorial';
import { MoveCoinCollection } from '../move-coin-collection';
import { RewardStore } from '../../effector/reward/store';
import { TutorialSlider } from '../tutorial-slider';
import cat1 from './cat1.jpg';
import cat2 from './cat2.jpg';
import cat3 from './cat3.jpg';
import { useDisplayTutorialSlider } from '../../hooks/use-display-tutorial-slider';
import { disableTutorialSlider } from '../../effector/app-condition/events';

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
const tutorialSliderContent = [
  {
    title: 'Тайтл 1',
    description:
      'Разнообразный и богатый опыт начало повседневной работы по формированию позиции требуют определения и уточнения системы обучения кадров, */ ',
  },
  {
    title: 'Выполняй задания, чтобы улучшить здания',
    description:
      'С другой стороны консультация с широким активом требуют определения и уточнения существенных финансовых и административных условий. Разнообразный и богатый опыт начало повседневной работы по формированию позиции требуют определения и уточнения системы обучения кадров',
  },
  {
    title: 'Заходи каждый день и будет весело',
    description:
      'Всё что я писал выше про свойство а применимо так же и к нему. При отрицательном значении отражает по вертикали.',
  },
];

const catImgArray = [cat1, cat2, cat3];

export const RootComponent = (): React.ReactElement => {
  const {
    isExtraTowerInfoModalOpen,
    selectedMenuItem,
    DOMLoaded,
    isAuthorized,
    showTutorialSlider,
  } = useStore(AppCondition);
  const { isCoinRelocateAnimationEnded } = useStore(RewardStore);

  // const [showSkipTutorialUI, setShowSkipTutorialUI] = useState(true);
  const { tutorialCondition, tutorialPause } = useStore(TutorialStore);
  const [tutorialSliderDisplayFlag, setTutorialSliderDisplayFlag] = useState(
    false
  );

  useDisplayTutorialSlider({
    selectedMenuItem,
    isExtraTowerInfoModalOpen,
    DOMLoaded,
    isAuthorized,
    showTutorialSlider,
    callBack: () => {
      setTutorialSliderDisplayFlag(true);
      disableTutorialSlider();
    },
  });

  return (
    <RootComponentWrapper id="rootScroll" displayFlag={DOMLoaded}>
      <Menu displayFlag={!!selectedMenuItem} />
      <TutorialSlider
        imgArray={catImgArray}
        displayFlag={tutorialSliderDisplayFlag}
        callback={() => setTutorialSliderDisplayFlag(false)}
        content={tutorialSliderContent}
      />
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
