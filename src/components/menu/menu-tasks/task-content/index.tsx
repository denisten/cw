import React from 'react';
import styled from 'styled-components';
import { TasksType } from '..';
import { Tasks } from './task';
import { Challenge } from './challenge';
import { Mission } from './mission';

const Body = styled.div`
  width: calc(100% - 28px);
  height: calc(100% - 50px);
  background: white;
  padding: 27px 24px 0 33px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export const TasksContent: React.FC<ITasksContent> = ({ activeType }) => {
  return (
    <Body>
      <Tasks active={activeType === TasksType.TASKS} />
      <Challenge active={activeType === TasksType.CHALLENGE} />
      <Mission active={activeType === TasksType.MISSION} />
    </Body>
  );
};

interface ITasksContent {
  activeType: TasksType;
}
