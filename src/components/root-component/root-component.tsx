import React from 'react';
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
import slider1 from './slider-1.png';
import slider2 from './slider-2.png';
import slider3 from './slider-3.png';
import slider4 from './slider-4.png';
import slider5 from './slider-5.png';
import { useDisplayTutorialSlider } from '../../hooks/use-display-tutorial-slider';
import {
  disableTutorialSlider,
  editTutorialSliderDisplayFlag,
} from '../../effector/app-condition/events';

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
    title: 'Выполняй задания, чтобы развивать город!',
    description:
      'В продуктах ежедневно будут появляться новые дела. Выполняя их, ты будешь получать валюту, опыт и еще много интересного!',
  },
  {
    title: 'Трать накопленную валюту на уникальные предложения!',
    description: 'Заходи в магазин и покупай то, что нужно именно тебе.',
  },
  {
    title: 'Нажми на название продукта и узнаешь о нем еще больше!',
    description: 'Переходи на сайт понравившегося продукта прямо из игры.',
  },
  {
    title: 'Улучшай здания и они принесут тебе больший доход уже завтра',
    description:
      'Чем выше уровень эволюции здания, тем больше налогов в копилку оно принесет.',
  },
  {
    title: 'Играй и получай призы!',
    description:
      'В продуктах иногда появляются игры. Не упусти шанс выиграть кое-что интересное!',
  },
];

const catImgArray = [slider1, slider2, slider3, slider4, slider5];

export const RootComponent = (): React.ReactElement => {
  const {
    isExtraTowerInfoModalOpen,
    selectedMenuItem,
    DOMLoaded,
    isAuthorized,
    neverShowTutorialSlider,
    tutorialSliderDisplayFlag,
  } = useStore(AppCondition);
  const { isCoinRelocateAnimationEnded } = useStore(RewardStore);

  // const [showSkipTutorialUI, setShowSkipTutorialUI] = useState(true);
  const { tutorialCondition, tutorialPause } = useStore(TutorialStore);

  useDisplayTutorialSlider({
    selectedMenuItem,
    isExtraTowerInfoModalOpen,
    DOMLoaded,
    isAuthorized,
    neverShowTutorialSlider,
    callBack: () => {
      editTutorialSliderDisplayFlag(true);
      disableTutorialSlider();
    },
  });

  return (
    <RootComponentWrapper id="rootScroll" displayFlag={DOMLoaded}>
      <Menu displayFlag={!!selectedMenuItem} />
      <TutorialSlider
        imgArray={catImgArray}
        displayFlag={tutorialSliderDisplayFlag}
        callback={() => editTutorialSliderDisplayFlag(false)}
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
