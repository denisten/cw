import React from 'react';
import { Task } from '../../tasks-row';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { TasksStore } from '../../../../effector/missions-store/store';
import { UnauthorizeTaskZone } from './unauthorize-task-zone';
import { TowerInfoModalStore } from '../../../../effector/tower-info-modal-store/store';

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
  const missions = useStore(TasksStore);
  const { focusOn } = useStore(TowerInfoModalStore);

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
