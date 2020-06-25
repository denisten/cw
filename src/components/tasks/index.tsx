import React, { useState } from 'react';
import styled from 'styled-components';
import { TasksHeader } from './tasks-header';
import { TasksContent } from './tasks-content';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';

const TasksBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export enum TasksType {
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
export const Tasks = () => {
  const [taskType, setTaskType] = useState(TasksType.TASKS);
  const { isAuthorized } = useStore(AppCondition);
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
