import React from 'react';
import styled from 'styled-components';
import { TowerInfo } from '../tower-info';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';

import mapTile from '../../img/roads/map-tile.png';
import { Menu } from '../menu';
import { TaskButton } from '../../UI/task-button';

import { ProfileButton } from '../../UI/profile-button';
import { TutorialToolsSelector } from '../../utils/arrows-container';

import { TutorialStore } from '../../effector/tutorial-store/store';
import { ScrollContainer } from '../scroll-container';

import { ZoomInOutButtons } from '../../UI/zoom-in-out-buttons';
import { testConnection } from '../../api/test-connection';

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

const TestButton = styled.div`
  position: absolute;
  left: 10%;
  bottom: 20%;
  width: 200px;
  height: 150px;
  background-color: peachpuff;
  z-index: 100;
`;

export const RootComponent = (): React.ReactElement => {
  const { isExtraTowerInfoModalOpen, selectedMenuItem, loaded } = useStore(
    AppCondition
  );

  const { tutorialCondition, tutorialPause } = useStore(TutorialStore);

  return (
    <ComponentWrapper id="rootScroll" visible={loaded}>
      <Menu displayFlag={!!selectedMenuItem} />
      <ProfileButton
        tutorialCondition={tutorialCondition}
        tutorialPause={tutorialPause}
      />
      <TestButton onClick={() => testConnection()} />
      <ZoomInOutButtons />
      <TaskButton />
      <TowerInfo opened={isExtraTowerInfoModalOpen} />
      <TutorialToolsSelector
        tutorialCondition={tutorialCondition}
        isInsideScrollContainer={false}
      />
      <ScrollContainer tutorialCondition={tutorialCondition}></ScrollContainer>
    </ComponentWrapper>
  );
};
