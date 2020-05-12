import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../../UI/icons';
import { TaskSubType } from '..';

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

export const TasksRow = () => {
  return (
    <TaskWrapper>
      <Icon type={TaskSubType.COSMETICS} />
    </TaskWrapper>
  );
};
