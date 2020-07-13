import React from 'react';
import { TowersTypes } from '../../effector/towers-progress/store';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { MissionsStore } from '../../effector/missions-store/store';
import { Task } from '../tasks/tasks-row';
import { filteredMissionsArray } from '../../utils/filtered-missions-array';
import { MTSSans } from '../../fonts';
import {
  TutorialStore,
  TutorialConditions,
} from '../../effector/tutorial-store/store';

const TowerInfoTaskWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  height: 580px;
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

const taskPreview = (tutorialCondition: TutorialConditions) => (
  <TowerInfoTaskWrapper style={styledConfig.towerInfoTaskWrapper}>
    <Title>Заданий нет.</Title>
    {tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO && (
      <DescText>Первые задания появятся после улучшения здания!</DescText>
    )}
  </TowerInfoTaskWrapper>
);

export const TowerInfoTask: React.FC<ITowerInfoTask> = ({ towerTitle }) => {
  const missions = useStore(MissionsStore);
  const { tutorialCondition } = TutorialStore.getState();

  if (!missions.length || tutorialCondition) taskPreview(tutorialCondition);
  const filteredMissions = filteredMissionsArray(missions, towerTitle);
  return (
    <TowerInfoTaskWrapper>
      {filteredMissions.length
        ? filteredMissions.map(el => {
            return (
              <Task
                towerTitle={towerTitle}
                expireInSeconds={el.expireInSeconds}
                id={el.id}
                isInTowerInfo={true}
                isAllowedToChange={true}
                type={el.task.content.taskType.slug}
                taskTitle={el.task.content.name}
                key={el.id}
                status={el.status}
                money={el.task.reward}
                energy={el.task.energy}
                description={el.task.content.description}
                taskTimer={el.taskTimer}
              />
            );
          })
        : taskPreview(tutorialCondition)}
    </TowerInfoTaskWrapper>
  );
};

interface ITowerInfoTask {
  towerTitle: TowersTypes;
}
