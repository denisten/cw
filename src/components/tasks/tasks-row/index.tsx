import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../../UI/icons';
import { TaskSubType } from '..';
import { MTSSans } from '../../../fonts';

const TaskWrapper = styled.div`
  width: 674px;
  height: 64px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 #e2e5eb;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 14px 18px;
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: #001424;
  font-family: ${MTSSans.BOLD};
  margin-left: 14px;
`;

export const TasksRow: React.FC<ITasksRow> = ({ type, taskTitle }) => {
  return (
    <TaskWrapper>
      <Icon type={type} />
      <Title>{taskTitle}</Title>
    </TaskWrapper>
  );
};

interface ITasksRow {
  type: TaskSubType;
  taskTitle: string;
}
