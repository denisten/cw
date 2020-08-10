import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { MTSSans } from '../../../fonts';
import {
  TutorialConditions,
  TutorialStore,
} from '../../../effector/tutorial-store/store';
import { TasksStore } from '../../../effector/task-store/store';
import { filteredMissionsArray } from '../../../utils/filtered-missions-array';
import { TowerTaskRow } from '../../tasks-view/tower-task-row';
import { TowersTypes } from '../../../effector/towers-progress/store';

const TowerInfoTaskWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  height: auto;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const styledConfig = {
  towerInfoTaskWrapper: {
    height: '370px',
  } as React.CSSProperties,
};

const Title = styled.span`
  font-family: ${MTSSans.BOLD};
  font-size: 32px;
  line-height: 40px;
  letter-spacing: -0.5px;
  color: #001424;
  opacity: 0.4;
  margin: 14px 0 8px 0;
`;

const DescText = styled.span`
  font-size: 16px;
  line-height: 20px;
  color: #001424;
  opacity: 0.6;
`;

const TaskPreview = (tutorialCondition: TutorialConditions) => (
  <TowerInfoTaskWrapper style={styledConfig.towerInfoTaskWrapper}>
    <Title>Заданий нет.</Title>
    {tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO && (
      <DescText>Первые задания появятся после улучшения здания!</DescText>
    )}
  </TowerInfoTaskWrapper>
);

export const TowerInfoTask: React.FC<ITowerInfoTask> = ({ towerTitle }) => {
  const missions = useStore(TasksStore);
  const { tutorialCondition } = TutorialStore.getState();
  if (!missions.length || tutorialCondition) TaskPreview(tutorialCondition);
  const filteredMissions = filteredMissionsArray(missions, towerTitle);
  return (
    <TowerInfoTaskWrapper>
      {filteredMissions.length
        ? filteredMissions.map(el => {
            return (
              <TowerTaskRow key={el.id} isInTowerInfo={true} taskData={el} />
            );
          })
        : TaskPreview(tutorialCondition)}
    </TowerInfoTaskWrapper>
  );
};

interface ITowerInfoTask {
  towerTitle: TowersTypes;
}
