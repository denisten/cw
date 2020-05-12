import React from 'react';
import styled from 'styled-components';
import { TasksType } from '..';
import { Task } from './task';
import { Challenge } from './challenge';
import { Mission } from './mission';
const Body = styled.div`
  width: calc(100% - 28px);
  height: 100%;
  background: white;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TasksContent: React.FC<{ activeType: TasksType }> = ({
  activeType,
}) => {
  return (
    <Body>
      <Task active={activeType === TasksType.TASKS} />
      <Challenge active={activeType === TasksType.CHALLENGES} />
      <Mission active={activeType === TasksType.MISSION} />
    </Body>
  );
};
