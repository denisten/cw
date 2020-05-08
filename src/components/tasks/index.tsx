import React, { useState } from 'react';
import styled from 'styled-components';
import { TasksHeader } from './tasks-header';

const TasksBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export enum TasksType {
  TASKS = 'tasks',
  CHALLENGES = 'сhallenges',
  MISSION = 'mission',
}
const taskTypes = [
  { id: TasksType.TASKS, label: 'Задачи' },
  { id: TasksType.CHALLENGES, label: 'Челленджи' },
  { id: TasksType.MISSION, label: 'Миссии' },
];
export const Tasks = () => {
  const [taskType, setTaskType] = useState(TasksType.TASKS);
  const selectTaskType = (type: TasksType) => {
    setTaskType(type);
  };
  return (
    <TasksBody>
      <TasksHeader
        callBack={selectTaskType}
        activeType={taskType}
        taskTypes={taskTypes}
      />
    </TasksBody>
  );
};
