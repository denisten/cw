import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  handleTaskWrapperClick,
  MenuTaskRow,
  TaskWrapper,
  Title,
} from '../tasks-view/menu-task-row';
import {
  Border,
  checkTaskStatus,
  TaskButton,
  TaskDescription,
  TaskDescriptionWrapper,
  TaskInfo,
  taskRowStyledConfig,
  VectorImg,
} from '../tasks-view/tower-task-row';
import { Icon } from '../../UI/icons';
import { RowWrapper } from '../../UI/row-wrapper';
import { ColumnWrapper } from '../../UI/column-wrapper';
import { TaskLoot } from '../../UI/task-loot';
import { TaskTimer } from '../../UI/task-timer';
import notDoneImg from '../tasks-view/tower-task-row/not-done.svg';
import { MTSSans } from '../../fonts';
import { ITask, TaskStatuses } from '../../effector/tasks-store/store';
import { handleTaskClick } from '../../utils/handle-task-click';
import { UnavailableSubtaskView } from './unavailable-subtask-view';
import { IDisplayFlag } from '../skip-tutorial';

const completedTaskMargin = 20;
const percents = 100;

const Wrapper = styled(TaskWrapper)`
  border: 2px solid #3baa07;
  box-sizing: border-box;
  border-radius: 4px;
`;

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

const CompletedTasksWrapper = styled.div<ICompletedTasksWrapper>`
  margin-bottom: ${props => (props.contentLength ? completedTaskMargin : 0)}px;
  display: ${props => (props.displayFlag ? 'block' : 'none')};
  width: 100%;
  height: auto;
`;

const calculateProgress = (completed: number, all: number) =>
  (completed / all) * percents;

const detectSubTaskId = (tasks: ITask[]) => {
  for (let taskId = 0; taskId < tasks.length; taskId++)
    if (tasks[taskId].status === TaskStatuses.CREATED) return taskId;
  return -1;
};

export const MissionsView: React.FC<IMissionsView> = ({ taskData }) => {
  const { taskTypeSlug: taskType } = taskData;

  const [isOpened, setIsOpened] = useState(false);

  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const currentSubtaskId = detectSubTaskId(taskData.userSubTasks);

  const completedSubTasksQuantity = taskData.userSubTasks.filter(
    el => el.status === TaskStatuses.DONE || el.status === TaskStatuses.REWARDED
  ).length;

  const NotCompletedSubTasks =
    currentSubtaskId !== -1
      ? taskData.userSubTasks
          .slice(currentSubtaskId + 1)
          .map(el => <UnavailableSubtaskView taskData={el} key={el.id} />)
      : React.Fragment;

  const CompletedSubTasks =
    currentSubtaskId !== -1
      ? taskData.userSubTasks
          .slice(0, currentSubtaskId + 1)
          .map(el => (
            <MenuTaskRow isInTowerInfo={false} taskData={el} key={el.id} />
          ))
      : React.Fragment;

  const handleClick = () =>
    handleTaskWrapperClick({
      taskDescriptionRef,
      isOpened,
      setIsOpened,
      taskType,
      vectorRef,
    });

  return (
    <>
      <Wrapper ref={taskWrapperRef} onClick={handleClick} isInTowerInfo={false}>
        <TaskInfo>
          <Icon type={taskType} />
          <Title isInTowerInfo={false}>{taskData.title}</Title>
          <RowWrapper>
            <ColumnWrapper {...taskRowStyledConfig.columnWrapper}>
              <TaskLoot
                money={taskData.money}
                energy={taskData.energy}
                isInTowerInfo={false}
              />
              {
                <TaskTimer
                  taskTimer={taskData.taskTimer}
                  expireInSeconds={taskData.expireInSeconds}
                />
              }
            </ColumnWrapper>
            <ColumnWrapper
              {...taskRowStyledConfig.columnWrapper}
              style={taskRowStyledConfig.columnWrapperAdditionalStyle}
            >
              <RowWrapper>
                {completedSubTasksQuantity !== taskData.userSubTasks.length ? (
                  <MissionProgressBar
                    progress={calculateProgress(
                      completedSubTasksQuantity,
                      taskData.userSubTasks.length
                    )}
                  >
                    <span>
                      {completedSubTasksQuantity}/{taskData.userSubTasks.length}
                    </span>
                  </MissionProgressBar>
                ) : (
                  <TaskButton
                    onClick={e => handleTaskClick(taskData, e)}
                    className={TaskStatuses.DONE}
                    expireInSeconds={taskData.expireInSeconds}
                  />
                )}

                {checkTaskStatus(taskData.status) && (
                  <img src={notDoneImg} alt="reject" />
                )}
              </RowWrapper>
            </ColumnWrapper>

            <VectorImg ref={vectorRef} />
          </RowWrapper>
        </TaskInfo>
        <TaskDescriptionWrapper ref={taskDescriptionRef}>
          <Border />
          <TaskDescription style={{ marginBottom: '20px' }}>
            {taskData.description}
          </TaskDescription>
        </TaskDescriptionWrapper>
        <CompletedTasksWrapper
          contentLength={CompletedSubTasks.length}
          displayFlag={isOpened}
        >
          {CompletedSubTasks}
        </CompletedTasksWrapper>
        {isOpened && NotCompletedSubTasks}
      </Wrapper>
    </>
  );
};

interface IMissionsView {
  taskData: ITask;
}

interface IMissionProgressBar {
  progress: number;
}

interface ICompletedTasksWrapper extends IDisplayFlag {
  contentLength: number;
}
