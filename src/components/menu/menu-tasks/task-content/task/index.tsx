import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { TasksStore } from '../../../../../effector/tasks-store/store';
import { UnauthorizedTaskZone } from './unauthorize-task-zone';
import { AppConditionStore } from '../../../../../effector/app-condition/store';
import { TaskRow } from '../../../../tasks-view/task-row';

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
      {tasks.map(el => (
        <TaskRow task={el} key={el.id} isInTowerInfo={false} />
      ))}
    </TasksWrapper>
  );
};

interface ITaskView {
  active: boolean;
}

interface ITaskWrapper {
  hidden: boolean;
}
