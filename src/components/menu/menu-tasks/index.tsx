import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { AppConditionStore } from '../../../effector/app-condition/store';
import { TasksContent } from './task-content';
import { TasksHeader } from './task-header';
enum TaskTypes {
  TUTORIAL_TASK = 'tutorial-task',
  TASK = 'task',
  CHALLENGE = 'challenge',
  MISSION = 'mission',
  NBO = 'nbo',
  PAID = 'paid',
  TARGET = 'target',
  INFORMATIONAL = 'informational',
  PRODUCT_QUIZ = 'product-quiz',
  RELATED_QUIZ = 'related-quiz',
  COSMETIC = 'cosmetic',
  SUBTASK = 'subtask',
}
const TasksBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const taskData = [
  { id: TaskTypes.TASK, label: 'Задачи' },
  { id: TaskTypes.MISSION, label: 'Миссии' },
];

export const MenuTasks = () => {
  const [taskType, setTaskType] = useState(TaskTypes.TASK);
  const { isAuthorized } = useStore(AppConditionStore);
  const selectTaskType = (type: TaskTypes) => {
    setTaskType(type);
  };
  return (
    <TasksBody>
      <TasksHeader
        callBack={selectTaskType}
        activeType={taskType}
        taskData={taskData}
        isAuthorized={isAuthorized}
      />
      <TasksContent activeType={taskType} />
    </TasksBody>
  );
};
