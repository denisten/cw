import React from 'react';
import styled from 'styled-components';
import { TasksType } from '..';
import { MTSSans } from '../../../fonts';
import chellenge from './chellenge.png';
import mission from './mission.png';
import task from './task.png';
import chellengeActive from './chellenge-active.png';
import missionActive from './mission-active.png';
import taskActive from './task-active.png';

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  overflow: hidden;
  flex-shrink: 0;
`;

const HeaderItem = styled.div<{ active: boolean }>`
  height: 100%;
  flex: 1;
  flex-shrink: 0;
  background: ${props => (props.active ? 'white' : '#dafaff')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: normal;
  line-height: 1.4;
  color: #01acc8;
  font-family: ${MTSSans.REGULAR};
  cursor: pointer;
  position: relative;
  z-index: ${props => (props.active ? '4 !important' : 'inherit')};
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;

  &:nth-child(1) {
    background: url(${props => (props.active ? taskActive : task)}) no-repeat
      center;
    background-size: 100% 100%;
    z-index: 3;
  }
  &:nth-child(2) {
    background: url(${props => (props.active ? chellengeActive : chellenge)})
      no-repeat center;
    background-size: 100% 100%;
  }

  &:nth-child(3) {
    background: url(${props => (props.active ? missionActive : mission)})
      no-repeat center;
    background-size: 100% 100%;
  }
`;

export const TasksHeader: React.FC<ITaskHeader> = ({
  activeType,
  taskTypes,
  callBack,
}) => {
  return (
    <Header>
      {taskTypes.map(taskElem => (
        <HeaderItem
          active={taskElem.id === activeType}
          key={taskElem.id}
          onClick={() => callBack(taskElem.id)}
        >
          <span>{taskElem.label}</span>
        </HeaderItem>
      ))}
    </Header>
  );
};

interface ITaskHeader {
  activeType: string;
  taskTypes: { id: TasksType; label: string }[];
  callBack: (type: TasksType) => void;
}
