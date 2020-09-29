import React from 'react';
import styled from 'styled-components';
import { ITask } from '../../../effector/tasks-store/store';
import { MissionWrapperWidth } from '../../missions-view/reduced-mission-row';
import { Icon } from '../../../UI/icons';

enum TaskRowWrapperPadding {
  IN_TOWER_INFO = '15px 16px 15px 15px',
  NOT_IN_TOWER_INFO = '15px 24px 15px 15px',
}

const TaskRowWrapper = styled.div<ITaskRowWrapper>`
  width: ${props =>
    props.isInTowerInfo
      ? MissionWrapperWidth.IN_TOWER_INFO
      : MissionWrapperWidth.NOT_IN_TOWER_INFO}px;
  height: 62px;
  background: #ffffff;
  border: 1px solid #ebecef;
  border-radius: 15px;
  padding: ${props =>
    props.isInTowerInfo
      ? TaskRowWrapperPadding.IN_TOWER_INFO
      : TaskRowWrapperPadding.NOT_IN_TOWER_INFO};
  box-sizing: border-box;
  margin-bottom: 16px;
`;

export const TaskRow2: React.FC<ITaskRow2> = ({ task, isInTowerInfo }) => {
  return (
    <TaskRowWrapper isInTowerInfo={isInTowerInfo}>
      <Icon type={task.taskTypeSlug} />
    </TaskRowWrapper>
  );
};

interface ITaskRow2 extends ITaskRowWrapper {
  task: ITask;
  isInTowerInfo: boolean;
}

interface ITaskRowWrapper {
  isInTowerInfo: boolean;
}
