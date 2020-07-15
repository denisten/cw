import React from 'react';
import { Task } from '../../tasks-row';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { MissionsStore } from '../../../../effector/missions-store/store';
import { UserDataStore } from '../../../../effector/user-data/store';
import { UnauthorizeTaskZone } from './unauthorize-task-zone';
import { AppCondition } from '../../../../effector/app-condition/store';
import { useHandleAuth } from '../../../../hooks/use-handle-auth';
import { TowersStore } from '../../../../effector/towers/store';

const TasksWrapper = styled.div<ITask>`
  display: ${props => (props.hidden ? 'hidden' : 'block')};
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Tasks: React.FC<{ active: boolean; isAuthorized: boolean }> = ({
  active,
  isAuthorized,
}) => {
  const missions = useStore(MissionsStore);
  const { worldName } = useStore(UserDataStore);
  const { dataReceived } = useStore(AppCondition);
  const { focusOn } = useStore(TowersStore);
  useHandleAuth({ isAuthorized, dataReceived, worldName });

  return (
    <TasksWrapper hidden={!active}>
      {!isAuthorized && <UnauthorizeTaskZone />}
      {missions.map(el => {
        return (
          <Task
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

interface ITask {
  hidden: boolean;
}
