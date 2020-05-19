import React from 'react';
import { TowersTypes } from '../../effector/towers-progress/store';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { MissionsStore } from '../../effector/missions-store/store';
import { Task } from '../tasks/tasks-row';
import { UserDataStore } from '../../effector/user-data/store';
import { AdvancedScrollbar } from '../../UI/advanced-scrollbar';
import { AdvanceScrollBarAttr } from '../../utils/handle-scroll';

const TowerInfoTaskWrapper = styled(AdvancedScrollbar)`
  margin-top: 24px;
  width: 100%;
  height: 580px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const TowerInfoTask: React.FC<ITowerInfoTask> = ({ towerTitle }) => {
  const missions = useStore(MissionsStore);
  const { couponsCount } = useStore(UserDataStore);
  const sortedMissions = missions.filter(el => el.towerTitle === towerTitle);
  return (
    <TowerInfoTaskWrapper data-type={AdvanceScrollBarAttr.ADVANCE_SCROLLBAR}>
      {sortedMissions.length
        ? sortedMissions.map(el => {
            return (
              <Task
                isInTowerInfo={true}
                couponsCount={couponsCount}
                isAllowedToChange={el.isAllowedToChange}
                type={el.type}
                taskTitle={el.taskTitle}
                key={el.taskTitle}
                status={el.status}
                money={el.loot.money}
                energy={el.loot.energy}
                description={el.description}
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
