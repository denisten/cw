import React from 'react';
import styled from 'styled-components';
import { ITask } from '../../../effector/tasks-store/store';
import { MenuTaskRow } from '../../tasks-view/menu-task-row';

const UnavailableTaskViewWrapper = styled.div`
  opacity: 0.5;
`;

export const UnavailableSubtaskView: React.FC<IUnavailableSubtaskView> = ({
  task,
}) => (
  <UnavailableTaskViewWrapper>
    <MenuTaskRow task={task} isInTowerInfo={false} available={false} />
  </UnavailableTaskViewWrapper>
);

interface IUnavailableSubtaskView {
  task: ITask;
}
