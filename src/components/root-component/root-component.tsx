import React from 'react';
import styled from 'styled-components';
import { TowerInfo } from '../tower-info';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import mapTile from '../../img/roads/map-tile.png';
import { Menu } from '../menu';
import { TutorialToolsSelector } from '../../utils/arrows-container';
import {
  TutorialStore,
  TutorialConditions,
} from '../../effector/tutorial-store/store';
import { ScrollContainer } from '../scroll-container';
import { TutorialOverlay } from '../tutorial-overlay';
import { zIndexForInheritOverlay } from '../../constants';
import { IDisplayFlag } from '../skip-tutorial';
import { MoveCoinCollection } from '../move-coin-collection';
import { TutorialSlider } from '../tutorial-slider';
import slider1 from './slider-1.png';
import slider2 from './slider-2.png';
import slider3 from './slider-3.png';
import slider4 from './slider-4.png';
import slider5 from './slider-5.png';
import { editTutorialSliderDisplayFlag } from '../../effector/app-condition/events';
import { UIButtonInterface } from '../UI-buttons-interface';
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

const tutorialSliderContent = [
  {
    title: 'Выполняйте задания, чтобы развивать город',
    description:
      'Новые задания появляются ежедневно. Выполняйте их, получайте игровую валюту, опыт и многое другое!  ',
  },
  {
    title: 'Тратьте валюту на уникальные предложения!',
    description: 'В магазине можно купить то, что нужно именно вам.',
  },
  {
    title: 'Нажмите на название здания, чтобы познакомиться поближе',
    description: 'Из здания можно перейти прямиком на сайт сервиса',
  },
  {
    title: 'Чем выше уровень здания, тем больше дохода оно генерирует',
    description: 'Улучшайте здания и собирайте больше виртуальных налогов',
  },
  {
    title: 'Играйте и выигрывайте',
    description:
      'В некоторых зданиях можно сыграть в специальные игры. Не упустите шанс!',
  },
];

const catImgArray = [slider1, slider2, slider3, slider4, slider5];

export const RootComponent = () => {
  const { selectedMenuItem, DOMLoaded, tutorialSliderDisplayFlag } = useStore(
    AppCondition
  );
  // const [showSkipTutorialUI, setShowSkipTutorialUI] = useState(true);
  const { tutorialCondition } = useStore(TutorialStore);

  return (
    <RootComponentWrapper id="rootScroll" displayFlag={DOMLoaded}>
      <Menu displayFlag={!!selectedMenuItem} />
      <TutorialSlider
        imgArray={catImgArray}
        displayFlag={tutorialSliderDisplayFlag}
        callback={() => editTutorialSliderDisplayFlag(false)}
        content={tutorialSliderContent}
      />
      <UIButtonInterface />
      <MoveCoinCollection />
      <TowerInfo />
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
