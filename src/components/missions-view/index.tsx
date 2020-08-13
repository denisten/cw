import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { MenuTaskRow, TaskWrapper, Title } from '../tasks-view/menu-task-row';
import {
  Border,
  checkTaskStatus,
  TaskDescription,
  TaskDescriptionWrapper,
  TaskInfo,
  taskRowStyledConfig,
  VectorImg,
} from '../tasks-view/tower-task-row';
import { TasksType } from '../menu/menu-tasks';
import { Icon } from '../../UI/icons';
import { RowWrapper } from '../../UI/row-wrapper';
import { ColumnWrapper } from '../../UI/column-wrapper';
import { TaskLoot } from '../../UI/task-loot';
import { TaskTimer } from '../../UI/task-timer';
import notDoneImg from '../tasks-view/tower-task-row/not-done.svg';
import { MTSSans } from '../../fonts';
import { ITask, TaskStatuses } from '../../effector/tasks-store/store';

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

export const MissionsView: React.FC<IMissionsView> = ({ taskData }) => {
  const [isOpened, setIsOpened] = useState(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const completedSubTasksQuantity = taskData.userSubTasks.filter(
    el => el.status === TaskStatuses.DONE
  ).length;

  const SubTaskView = taskData.userSubTasks.map(el => {
    return <MenuTaskRow isInTowerInfo={false} taskData={el} key={el.task.id} />;
  });

  const handleTaskWrapperClick = () =>
    requestAnimationFrame(() => {
      if (
        taskDescriptionRef.current &&
        taskData.task.content.taskType.slug !== TasksType.TUTORIAL_TASK &&
        vectorRef.current
      ) {
        if (isOpened) {
          taskDescriptionRef.current.style.display = 'none';
          taskDescriptionRef.current.style.opacity = '0';
          vectorRef.current.style.transform = 'rotate(0deg)';
          setIsOpened(false);
        } else {
          taskDescriptionRef.current.style.display = 'flex';
          taskDescriptionRef.current.style.opacity = '1';
          vectorRef.current.style.transform = 'rotate(180deg)';
          setIsOpened(true);
        }
      }
    });

  return (
    <>
      <Wrapper
        ref={taskWrapperRef}
        onClick={handleTaskWrapperClick}
        isInTowerInfo={false}
      >
        <TaskInfo>
          <Icon type={taskData.task.content.taskType.slug} />
          <Title isInTowerInfo={false}>{taskData.task.content.name}</Title>
          <RowWrapper>
            <ColumnWrapper {...taskRowStyledConfig.columnWrapper}>
              <TaskLoot
                money={taskData.task.reward}
                energy={taskData.task.energy}
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
                <MissionProgressBar
                  progress={
                    completedSubTasksQuantity / taskData.userSubTasks.length
                  }
                >
                  <span>
                    {completedSubTasksQuantity}/{taskData.userSubTasks.length}
                  </span>
                </MissionProgressBar>
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
          <TaskDescription>{taskData.task.content.description}</TaskDescription>
        </TaskDescriptionWrapper>
      </Wrapper>
      {isOpened && SubTaskView}
    </>
  );
};

interface IMissionsView {
  taskData: ITask;
}

interface IMissionProgressBar {
  progress: number;
}
