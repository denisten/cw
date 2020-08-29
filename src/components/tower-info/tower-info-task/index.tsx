import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { MTSSans } from '../../../fonts';
import {
  TutorialConditions,
  TutorialStore,
} from '../../../effector/tutorial-store/store';
import { TasksStore } from '../../../effector/tasks-store/store';
import { filterTasksArray } from '../../../utils/filtered-missions-array';
import { TowerTaskRow } from '../../tasks-view/tower-task-row';
import { TowersTypes } from '../../../effector/towers-progress/store';
import { MissionsStore } from '../../../effector/missions-store/store';
import { TowerMissionRow } from '../../missions-view/tower-mission-row';

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

const TitleSeparator = styled.div`
  margin: 25px 0 10px 0;
  :after {
    font-family: ${MTSSans.MEDIUM};
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #001424;
    content: 'Задания';
  }
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
  const tasks = useStore(TasksStore);
  const missions = useStore(MissionsStore);
  const { tutorialCondition } = useStore(TutorialStore);
  const filteredTasks = filterTasksArray(tasks, towerTitle);
  const filteredMissions = filterTasksArray(missions, towerTitle);
  const tasksView = filteredTasks.map(task => (
    <TowerTaskRow key={task.id} isInTowerInfo={true} task={task} />
  ));
  const missionsView = filteredMissions.map(el => (
    <TowerMissionRow task={el} isInTowerInfo={true} key={el.id} />
  ));

  const Content = () => (
    <>
      {missionsView} <TitleSeparator /> {tasksView}
    </>
  );

  return (
    <TowerInfoTaskWrapper>
      {filteredTasks.length ? <Content /> : TaskPreview(tutorialCondition)}
    </TowerInfoTaskWrapper>
  );
};

interface ITowerInfoTask {
  towerTitle: TowersTypes;
}
