import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { MenuTaskRow } from '../../../../tasks-view/menu-task-row';
import { TasksStore } from '../../../../../effector/task-store/store';
import { UnauthorizedTaskZone } from './unauthorize-task-zone';
import { AppConditionStore } from '../../../../../effector/app-condition/store';

export const TasksWrapper = styled.div<ITaskWrapper>`
  display: ${props => (props.hidden ? 'hidden' : 'block')};
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Tasks: React.FC<ITaskView> = ({ active }) => {
  const tasks = useStore(TasksStore);
  const { isAuthorized } = useStore(AppConditionStore);
  return (
    <TasksWrapper hidden={!active}>
      {!isAuthorized && <UnauthorizedTaskZone />}
      {tasks.map(el => {
        return <MenuTaskRow taskData={el} key={el.id} isInTowerInfo={false} />;
      })}
    </TasksWrapper>
  );
};

interface ITaskView {
  active: boolean;
}

interface ITaskWrapper {
  hidden: boolean;
}

// isAllowedToChange={true}
// towerTitle={focusOn || undefined}
// expireInSeconds={el.expireInSeconds}
// id={el.id}
// type={el.task.content.taskType.slug}
// taskTitle={el.task.content.name}
// key={el.id}
// status={el.status}
// money={el.task.reward}
// energy={el.task.energy}
// description={el.task.content.description}
// taskTimer={el.taskTimer}
