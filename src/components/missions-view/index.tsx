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
import { ITask, TaskStatuses } from '../../effector/tasks-store/store';
import { UnavailableSubtaskView } from './unavailable-subtask-view';
import { MissionProgressBarButton } from '../../UI/mission-progress-bar-button';
import { TaskTypes } from '../../app';
import { IDisplayFlag } from '../root-component';
import { calculateCompletedSubTasksQuantity } from './mission-tower-row-view';

const completedTaskMargin = 20;

const Wrapper = styled(TaskWrapper)`
  border: 2px solid #3baa07;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const CompletedTasksWrapper = styled.div<ICompletedTasksWrapper>`
  margin-bottom: ${props => (props.contentLength ? completedTaskMargin : 0)}px;
  display: ${props => (props.displayFlag ? 'block' : 'none')};
  width: 100%;
  height: auto;
`;

export const detectSubTaskIdx = (tasks: ITask[]) => {
  const wantedStatuses = new Set([
    TaskStatuses.CREATED,
    TaskStatuses.ACTIVE,
    TaskStatuses.REJECTED,
  ]);
  for (let taskIdx = 0; taskIdx < tasks.length; taskIdx++)
    if (wantedStatuses.has(tasks[taskIdx].status)) return taskIdx;
  return -1;
};

export const MissionMenuRowView: React.FC<IMissionsView> = ({ taskData }) => {
  const { taskTypeSlug: taskType } = taskData;

  const [isOpened, setIsOpened] = useState(false);

  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const currentSubtaskIdx = detectSubTaskIdx(taskData.userSubTasks);

  const completedSubTasksQuantity = calculateCompletedSubTasksQuantity(
    taskData
  );

  const NotCompletedSubTasks =
    currentSubtaskIdx !== -1
      ? taskData.userSubTasks
          .slice(currentSubtaskIdx + 1)
          .map(el => <UnavailableSubtaskView task={el} key={el.id} />)
      : React.Fragment;

  const CompletedSubTasks =
    currentSubtaskIdx !== -1
      ? taskData.userSubTasks
          .slice(0, currentSubtaskIdx + 1)
          .map(el => (
            <MenuTaskRow
              isInTowerInfo={false}
              task={el}
              key={el.id}
              taskType={TaskTypes.SUBTASK}
            />
          ))
      : taskData.userSubTasks.map(el => (
          <MenuTaskRow
            isInTowerInfo={false}
            task={el}
            key={el.id}
            taskType={TaskTypes.SUBTASK}
          />
        ));

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
              <TaskTimer
                expireInSeconds={taskData.localExpireInSeconds}
                towerTitle={taskData.productSlug}
              />
            </ColumnWrapper>
            <ColumnWrapper
              {...taskRowStyledConfig.columnWrapper}
              style={taskRowStyledConfig.columnWrapperAdditionalStyle}
            >
              <MissionProgressBarButton
                task={taskData}
                completedSubTasksQuantity={completedSubTasksQuantity}
              />
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

interface ICompletedTasksWrapper extends IDisplayFlag {
  contentLength: number;
}
