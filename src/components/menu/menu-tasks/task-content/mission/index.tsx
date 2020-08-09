import React from 'react';
import { useStore } from 'effector-react';
import { MissionsStore } from '../../../../../effector/missions-store/store';
import { UnauthorizedTaskZone } from '../task/unauthorize-task-zone';
import { MenuTaskRow } from '../../../../tasks/menu-task-row';
import { TasksWrapper } from '../task';
import { TowerInfoModalStore } from '../../../../../effector/tower-info-modal-store/store';
import { AppConditionStore } from '../../../../../effector/app-condition/store';

export const Mission: React.FC<IMission> = ({ active }) => {
  const missions = useStore(MissionsStore);
  const { focusOn } = useStore(TowerInfoModalStore);
  const { isAuthorized } = useStore(AppConditionStore);
  return (
    <TasksWrapper hidden={!active}>
      {!isAuthorized && <UnauthorizedTaskZone />}
      {missions.map(el => {
        return (
          <MenuTaskRow
            towerTitle={focusOn || undefined}
            expireInSeconds={el.expireInSeconds}
            id={el.id}
            isInTowerInfo={false}
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
      })}
    </TasksWrapper>
  );
};

interface IMission {
  active: boolean;
}
