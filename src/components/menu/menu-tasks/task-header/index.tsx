import React from 'react';
import styled from 'styled-components';
import { TasksType } from '..';
import challenge from './chellenge.png';
import challengeNotAuth from './chellenge-not-auth.png';
import mission from './mission.png';
import task from './task.png';
import challengeActive from './chellenge-active.png';
import missionActive from './mission-active.png';
import missionNotAuth from './mission-not-auth.png';
import taskActive from './task-active.png';
import { MTSSans } from '../../../../fonts';

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  overflow: hidden;
  flex-shrink: 0;
`;
const selectBackground = (
  active: boolean,
  disable: boolean,
  type: TasksType.MISSION | TasksType.CHALLENGE
) => {
  if (type === TasksType.CHALLENGE) {
    if (active && !disable) return challengeActive;
    else if (disable) return challengeNotAuth;
    else if (!active && !disable) return challenge;
  } else {
    if (active && !disable) return missionActive;
    else if (disable) return missionNotAuth;
    else if (!active && !disable) return mission;
  }
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
    background: url(${props =>
        selectBackground(props.active, props.disable, TasksType.CHALLENGE)})
      no-repeat center;
    background-size: 100% 100%;
    left: -14px;
    z-index: 1;
    color: ${props => (props.disable ? '#768C8F ' : '#01acc8')};
  }

  &:nth-child(3) {
    background: url(${props =>
        selectBackground(props.active, props.disable, TasksType.MISSION)})
      no-repeat center;
    background-size: 100% 100%;
    left: -28px;
    color: ${props => (props.disable ? '#768C8F ' : '#01acc8')};
  }
`;

export const TasksHeader: React.FC<ITaskHeader> = ({
  activeType,
  taskTypes,
  callBack,
  isAuthorized,
}) => {
  return (
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
};

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
