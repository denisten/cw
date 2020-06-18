import React from 'react';
import { TowersTypes } from '../../effector/towers-progress/store';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { MissionsStore } from '../../effector/missions-store/store';
import { Task } from '../tasks/tasks-row';
import { UserDataStore } from '../../effector/user-data/store';

const TowerInfoTaskWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  height: 580px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const maxTaskLength = 16;

export const TowerInfoTask: React.FC<ITowerInfoTask> = ({ towerTitle }) => {
  const missions = useStore(MissionsStore);
  const { couponsCount } = useStore(UserDataStore);
  const sortedMissions = missions.filter(
    el => el.task.content.product.slug === towerTitle
  );
  return (
    <TowerInfoTaskWrapper>
      {sortedMissions.length
        ? sortedMissions.map(el => {
            return (
              <Task
                expireInSeconds={el.expireInSeconds}
                id={el.id}
                isInTowerInfo={true}
                couponsCount={couponsCount}
                isAllowedToChange={true}
                type={el.task.content.taskType.slug}
                taskTitle={`${el.task.content.name.slice(0, maxTaskLength)}...`}
                key={el.task.id}
                status={el.status}
                money={el.task.reward}
                energy={el.task.energy}
                description={el.task.content.description}
              />
            );
          })
        : 'Заданий нет.'}
    </TowerInfoTaskWrapper>
  );
};

interface ITowerInfoTask {
  towerTitle: TowersTypes;
}
