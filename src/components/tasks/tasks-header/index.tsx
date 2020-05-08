import React from 'react';
import styled from 'styled-components';
import { TasksType } from '..';
import { MTSSans } from '../../../fonts';

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
  transform: skew(15deg);
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;

  span {
    transform: skew(-15deg);
  }

  &:nth-child(1) {
    box-shadow: ${props =>
      props.active
        ? '5px 5px 12px 0px rgba(26, 29, 34, 0.21)'
        : 'inset -2px 0 0 0 #02acc8'};
    left: -6px;
    z-index: 3;
  }
  &:nth-child(2) {
    box-shadow: ${props =>
      props.active
        ? '0px 5px 12px 0px rgba(26, 29, 34, 0.21)'
        : 'inset -2px 0 0 0 #02acc8'};
    left: -10px;
    transform: perspective(110px) rotateX(10deg);
    z-index: 2;
    span {
      transform: perspective(200px) rotateX(-10deg);
    }
  }

  &:nth-child(3) {
    transform: skew(0deg);
    left: -14px;
    box-shadow: ${props =>
      props.active ? '-5px 5px 12px 0px rgba(26, 29, 34, 0.21)' : ''};
    span {
      transform: skew(0deg);
    }
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
