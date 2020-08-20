import React from 'react';
import styled from 'styled-components';
import { TasksType } from '..';
import task from './task.svg';
import missionActive from './mission-active.svg';
import missionNotAuth from './mission-not-auth.png';
import taskActive from './task-active.svg';
import missionImg from './mission.svg';
import { MTSSans } from '../../../../fonts';

const leftPosition = {
  active: 15,
  notSelected: 21,
};

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  overflow: hidden;
  flex-shrink: 0;
`;

const selectBackground = (active: boolean, disable: boolean) => {
  if (active && !disable) return missionActive;
  else if (disable) return missionNotAuth;
  else if (!active && !disable) return missionImg;
};

const HeaderItem = styled.div<IHeaderItem>`
  height: 100%;
  flex: 1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: normal;
  line-height: 1.4;
  color: #01acc8;
  font-family: ${MTSSans.REGULAR};
  cursor: ${props => (props.disable ? 'none' : 'pointer')};
  position: relative;
  z-index: ${props => (props.active ? '4 !important' : 'inherit')};
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  pointer-events: ${props => (props.disable ? 'none' : 'auto')};

  &:nth-child(1) {
    background: url(${props => (props.active ? taskActive : task)}) no-repeat
      center;
    background-size: 100% 100%;
    z-index: 2;
  }
  &:nth-child(2) {
    background: url(${props => selectBackground(props.active, props.disable)})
      no-repeat center;
    background-size: 100% 100%;
    left: -${props => (props.active ? leftPosition.active : leftPosition.notSelected)}px;
    bottom: 1px;
    z-index: 1;
    color: ${props => (props.disable ? '#768C8F ' : '#01acc8')};
  }
`;

export const TasksHeader: React.FC<ITaskHeader> = ({
  activeType,
  taskTypes,
  callBack,
  isAuthorized,
}) => (
  <Header>
    {taskTypes.map(taskElem => (
      <HeaderItem
        active={taskElem.id === activeType}
        key={taskElem.id}
        onClick={() => callBack(taskElem.id)}
        disable={!isAuthorized && taskElem.id !== TasksType.TASKS}
      >
        <span>{taskElem.label}</span>
      </HeaderItem>
    ))}
  </Header>
);

interface ITaskHeader {
  activeType: string;
  taskTypes: { id: TasksType; label: string }[];
  callBack: (type: TasksType) => void;
  isAuthorized: boolean;
}

interface IHeaderItem {
  active: boolean;
  disable: boolean;
}
