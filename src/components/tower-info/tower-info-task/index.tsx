import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { MTSSans } from '../../../fonts';
import {
  TutorialConditions,
  TutorialStore,
} from '../../../effector/tutorial-store/store';
import { ITask, TasksStore } from '../../../effector/tasks-store/store';
import { filterTasksArray } from '../../../utils/filtered-missions-array';
import { TowerTaskRow } from '../../tasks-view/tower-task-row';
import { TowersTypes } from '../../../effector/towers-progress/store';
import { MissionsStore } from '../../../effector/missions-store/store';
import { MissionTowerRowView } from '../../missions-view/mission-tower-row-view';
import { MissionTowerView } from '../../missions-view/mission-tower-view';
import { IDisplayFlag } from '../../root-component';

const TowerInfoTaskWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  height: 100%;
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

const TitleSeparator = styled.div<IDisplayFlag>`
  display: ${props => (props.displayFlag ? 'block' : 'none')};
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
const NoTaskView = (tutorialCondition: TutorialConditions) => (
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

  const [selectedMission, setSelectedMission] = useState<ITask | null>(null);

  const { tutorialCondition } = useStore(TutorialStore);
  const filteredTasks = filterTasksArray(tasks, towerTitle);
  const filteredMissions = filterTasksArray(missions, towerTitle);
  const tasksView = filteredTasks.map(task => (
    <TowerTaskRow key={task.id} isInTowerInfo={true} task={task} />
  ));
  const missionsView = filteredMissions.map(el => (
    <MissionTowerRowView
      mission={el}
      isInTowerInfo={true}
      key={el.id}
      callback={(payload: ITask) => setSelectedMission(payload)}
    />
  ));

  const Content = () => (
    <>
      {missionsView}
      <TitleSeparator
        displayFlag={!!filteredMissions.length && !!filteredTasks.length}
      />
      {tasksView}
    </>
  );

  useEffect(() => {
    setSelectedMission(null);
  }, [towerTitle]);

  return (
    <TowerInfoTaskWrapper>
      {selectedMission ? (
        <MissionTowerView
          mission={selectedMission}
          exitCallback={() => setSelectedMission(null)}
        />
      ) : filteredTasks.length || filteredMissions.length ? (
        <Content />
      ) : (
        NoTaskView(tutorialCondition)
      )}
    </TowerInfoTaskWrapper>
  );
};

interface ITowerInfoTask {
  towerTitle: TowersTypes;
}
