import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { AppConditionStore } from '../../../effector/app-condition/store';
import { TasksContent } from './task-content';
import { TasksHeader } from './task-header';

const TasksBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export enum TasksType {
  TUTORIAL_TASK = 'tutorial-task',
  TASKS = 'tasks',
  CHALLENGE = 'challenge',
  MISSION = 'mission',
  NBO = 'nbo',
  PAID = 'paid',
  TARGET = 'target',
  INFORMATIONAL = 'informational',
  PRODUCT_QUIZ = 'product-quiz',
  RELATED_QUIZ = 'related-quiz',
  COSMETIC = 'cosmetic',
}

const taskTypes = [
  { id: TasksType.TASKS, label: 'Задачи' },
  { id: TasksType.CHALLENGE, label: 'Челленджи' },
  { id: TasksType.MISSION, label: 'Миссии' },
];

export const MenuTasks = () => {
  const [taskType, setTaskType] = useState(TasksType.TASKS);
  const { isAuthorized } = useStore(AppConditionStore);
  const selectTaskType = (type: TasksType) => {
    setTaskType(type);
  };
  return (
    <TasksBody>
      <TasksHeader
        callBack={selectTaskType}
        activeType={taskType}
        taskTypes={taskTypes}
        isAuthorized={isAuthorized}
      />
      <TasksContent activeType={taskType} />
    </TasksBody>
  );
};
