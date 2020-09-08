import React from 'react';
import styled from 'styled-components';
import { ITask, TaskStatuses } from '../../effector/tasks-store/store';
import {
  checkTaskStatus,
  TaskButton,
} from '../../components/tasks-view/tower-task-row';
import notDoneImg from '../../components/tasks-view/tower-task-row/not-done.svg';
import { RowWrapper } from '../row-wrapper';
import { MTSSans } from '../../fonts';
import { handleMissionClick } from '../../utils/handle-mission-click';

const MissionProgressBar = styled.div<IMissionProgressBar>`
  width: 110px;
  height: 16px;
  overflow: hidden;
  transform: skew(-31deg);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d6f0f4;
  box-shadow: inset 0 0 2px rgba(32, 189, 218, 0.179469);
  span {
    transform: skew(31deg);
    color: #fff;
    font-family: ${MTSSans.REGULAR};
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.3px;
  }
  :before {
    position: absolute;
    width: ${props => props.progress}%;
    height: 100%;
    content: '';
    top: 0;
    left: 0;
    background: #02adc9;
    box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.5);
  }
`;
const percents = 100;

const calculateProgress = (completed: number, all: number) =>
  (completed / all) * percents;

export const MissionProgressBarButton: React.FC<IMissionProgressBarButton> = ({
  task,
  completedSubTasksQuantity,
  style,
  exitCallback,
}) => {
  const handleMissionButtonClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    task.status !== TaskStatuses.CREATED && exitCallback && exitCallback();
    await handleMissionClick({ mission: task, e });
  };

  return (
    <RowWrapper style={style}>
      {completedSubTasksQuantity !== task.userSubTasks.length ? (
        <MissionProgressBar
          progress={calculateProgress(
            completedSubTasksQuantity,
            task.userSubTasks.length
          )}
        >
          <span>
            {completedSubTasksQuantity}/{task.userSubTasks.length}
          </span>
        </MissionProgressBar>
      ) : (
        <TaskButton
          onClick={handleMissionButtonClick}
          className={TaskStatuses.DONE}
          expireInSeconds={task.expireInSeconds}
        />
      )}
      {checkTaskStatus(task.status) && <img src={notDoneImg} alt="reject" />}
    </RowWrapper>
  );
};

interface IMissionProgressBarButton {
  exitCallback?: Function;
  task: ITask;
  completedSubTasksQuantity: number;
  style?: React.CSSProperties;
}

interface IMissionProgressBar {
  progress: number;
}
