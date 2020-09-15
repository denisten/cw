import React from 'react';
import styled from 'styled-components';
import { Tasks } from './task';
import { Challenge } from './challenge';
import { Mission } from './mission';
import { TaskTypes } from '../../../../app';

const Body = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  background: white;
  padding: 27px 24px 0 33px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background: white;
`;

export const TasksContent: React.FC<ITasksContent> = ({ activeType }) => {
  return (
    <Body>
      <Tasks active={activeType === TaskTypes.TASK} />
      <Challenge active={activeType === TaskTypes.CHALLENGE} />
      <Mission active={activeType === TaskTypes.MISSION} />
    </Body>
  );
};

interface ITasksContent {
  activeType: TaskTypes;
}
