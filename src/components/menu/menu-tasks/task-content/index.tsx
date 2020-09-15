import React from 'react';
import styled from 'styled-components';
import { Tasks } from './task';
import { Challenge } from './challenge';
import { Mission } from './mission';
import { TaskTypes } from '../../../../app';

const Body = styled.div`
  width: calc(100% - 22px);
  height: calc(100% - 50px);
  padding: 27px 24px 0 33px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
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
