import React, { useEffect, useState, useRef } from 'react';
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
import backgroundMusic from '../../sound/background-sound.mp3';
import { UserDataStore } from '../../effector/user-data/store';
import { useRefreshProgress } from '../../hooks/use-refresh-progress';
import { TasksStore } from '../../effector/tasks-store/store';
import { MissionsStore } from '../../effector/missions-store/store';
import { TutorialDialog } from '../tutorial-dialog';
import { useLogout } from '../../hooks/use-logout';

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

const contentConfig = {
  messages: ['На сегодня всё. Приходи завтра!'],
  titles: ['Вау! Ты выполнил все задания!'],
  buttonContent: [
    { name: 'ОК', eventLabel: 'ok', eventContent: 'ok', eventContext: 'ok' },
  ],
};

export const RootComponent = () => {
  const {
    DOMLoaded,
    tutorialSliderDisplayFlag,
    isAuthorized,
    fetchedTasks,
    isLogout,
  } = useStore(AppConditionStore);
  const { tutorialCondition } = useStore(TutorialStore);
  const { volume } = useStore(SettingsStore).music;
  const { freshProgressTimeout } = useStore(UserDataStore);
  const tasks = useStore(TasksStore);
  const missions = useStore(MissionsStore);

  useLogout(isLogout);

  const [tasksAvailableFlag, setTasksAvailableFlag] = useState(false);

  useEffect(() => {
    if (!tasks.length && !missions.length && isAuthorized && fetchedTasks) {
      setTasksAvailableFlag(true);
    }
  }, [tasks.length, missions.length, isAuthorized, fetchedTasks]);

  const tutorialIsEnabled = DOMLoaded && tutorialCondition !== 0;
  const displayFlag = checkTutorialCondition(tutorialCondition);
  const zIndex = defineScrollContainerZIndex(tutorialCondition);
  const { play } = useAudio(backgroundMusic, true, 'music');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    DOMLoaded && play();
  }, [DOMLoaded]);

  const playMusicEvent = () => {
    volume && play();
    rootRef.current &&
      rootRef.current.removeEventListener('click', playMusicEvent);
  };

  useEffect(() => {
    rootRef.current &&
      rootRef.current.addEventListener('click', playMusicEvent);
  }, []);

  useRefreshProgress(freshProgressTimeout, isAuthorized);
  return (
    <RootComponentWrapper displayFlag={DOMLoaded} ref={rootRef}>
      <UIButtonInterface />
      <Menu />
      {tutorialSliderDisplayFlag && <InitTutorialSlider />}
      {tasksAvailableFlag && (
        <TutorialDialog
          mustBeAsAnimated={true}
          content={contentConfig}
          closeCallback={() => setTasksAvailableFlag(false)}
        />
      )}
      <>
        <MoveCoinCollection />
        <TowerInfo />
        <Encyclopedia />
        <Shop />
      </>
      {tutorialIsEnabled && (
        <TutorialToolsSelector
          tutorialCondition={tutorialCondition}
          isInsideScrollContainer={false}
        />
      )}
      <ScrollContainer tutorialCondition={tutorialCondition} zIndex={zIndex} />
      <TutorialOverlay
        displayFlag={displayFlag}
        zIndex={zIndexForInheritOverlay}
      />
    </RootComponentWrapper>
  );
};

export interface IDisplayFlag {
  displayFlag: boolean;
}
