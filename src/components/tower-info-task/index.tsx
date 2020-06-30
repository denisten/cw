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

const towerInfoTaskPlaceholderStyle = {
  height: '370px',
} as React.CSSProperties;

export const TowerInfoTask: React.FC<ITowerInfoTask> = ({ towerTitle }) => {
  const missions = useStore(MissionsStore);
  const { couponsCount } = useStore(UserDataStore);
  if (!missions.length)
    return (
      <TowerInfoTaskWrapper style={towerInfoTaskPlaceholderStyle}>
        Заданий нет.
      </TowerInfoTaskWrapper>
    );
  const filteredMissionsArray = missions.filter(el => {
    if (el?.task?.content?.product?.slug)
      return el.task.content.product.slug === towerTitle;
  });
  return (
    <TowerInfoTaskWrapper>
      {filteredMissionsArray.length
        ? filteredMissionsArray.map(el => {
            return (
              <Task
                expireInSeconds={el.expireInSeconds}
                id={el.id}
                isInTowerInfo={true}
                couponsCount={couponsCount}
                isAllowedToChange={true}
                type={el.task.content.taskType.slug}
                taskTitle={`${el.task.content.name.slice(0, maxTaskLength)}...`}
                key={el.id}
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
