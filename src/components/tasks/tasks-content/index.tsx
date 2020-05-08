import React from 'react';
import styled from 'styled-components';
import { TasksType } from '..';
import { Task } from './task';
import { Challenge } from './challenge';
import { Mission } from './mission';
const Body = styled.div`
  width: 100%;
  height: 100%;
  background: white;
`;

export const TasksContent: React.FC<{ activeType: TasksType }> = ({
  activeType,
}) => {
  {
    switch (activeType) {
      case TasksType.TASKS:
        return (
          <Body>
            <Task />
          </Body>
        );
      case TasksType.CHALLENGES:
        return (
          <Body>
            <Challenge />
          </Body>
        );
      case TasksType.MISSION:
        return (
          <Body>
            <Mission />
          </Body>
        );

      default:
        return <span>none</span>;
    }
  }
};
