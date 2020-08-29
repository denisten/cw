import React, { useRef, useState } from 'react';
import { useStore } from 'effector-react';
import { SettingsStore } from '../../../effector/settings/store';
import { useAudio } from '../../../hooks/use-sound';
import { TasksType } from '../../menu/menu-tasks';
import {
  Border,
  checkTaskStatus,
  HintWrapper,
  ITasksRow,
  TaskButton,
  TaskDescription,
  TaskDescriptionWrapper,
  TaskInfo,
  taskRowStyledConfig,
  TaskWrapper,
  Title,
  TowerTaskRow,
  VectorImg,
} from '../../tasks-view/tower-task-row';
import { TaskStatuses } from '../../../effector/tasks-store/store';
import { handleTaskClick } from '../../../utils/handle-task-click';
import { RowWrapper } from '../../../UI/row-wrapper';
import { TaskLoot } from '../../../UI/task-loot';
import { couponModalConfig } from '../../tower-info/tower-info-chat';
import { ModalWindow } from '../../modal-window';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { handleTaskWrapperClick } from '../../tasks-view/menu-task-row';
import { TaskTimer } from '../../../UI/task-timer';
import { Icon } from '../../../UI/icons';
import activeTask from '../../../sound/active-task.mp3';
import takeRewardSound from '../../../sound/take-reward.mp3';
import notDoneImg from '../../tasks-view/tower-task-row/not-done.svg';
import styled from 'styled-components';

const MissionWrapper = styled(TaskWrapper)`
  border: 2px solid #8ec811;
`;

export const TowerMissionRow: React.FC<ITasksRow> = ({
  isInTowerInfo,
  task,
}) => {
  const { taskTypeSlug: taskType, productSlug: towerTitle } = task;

  const [isOpened, setIsOpened] = useState(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const {
    sound: { enable, volume },
  } = useStore(SettingsStore);
  const { play: playRewardSound } = useAudio(takeRewardSound, false, volume);
  const { play: playActiveTask } = useAudio(activeTask, false, volume);

  const [isCouponModalWindowOpen, setIsCouponModalWindowOpen] = useState(false);

  const handleWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (taskType === TasksType.TUTORIAL_TASK) {
      // do next tutorial step in future
    } else {
      handleTaskClick(task, e);
      task.status === TaskStatuses.DONE && enable && playRewardSound();
      task.status === TaskStatuses.CREATED && enable && playActiveTask();
    }
  };
  const handleClick = () =>
    handleTaskWrapperClick({
      taskDescriptionRef,
      isOpened,
      setIsOpened,
      taskType,
      vectorRef,
    });

  const handleHintClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCouponModalWindowOpen(true);
  };

  return (
    <MissionWrapper
      ref={taskWrapperRef}
      onClick={handleClick}
      isInTowerInfo={isInTowerInfo}
    >
      <ModalWindow
        {...couponModalConfig}
        displayFlag={isCouponModalWindowOpen}
        cancelHandler={() => setIsCouponModalWindowOpen(false)}
        id={task.id}
        towerTitle={towerTitle}
      />
      <TaskInfo>
        <Icon type={taskType} />
        <Title isInTowerInfo={isInTowerInfo}>{task.title}</Title>
        <VectorImg ref={vectorRef} />
      </TaskInfo>
      <TaskDescriptionWrapper ref={taskDescriptionRef}>
        <Border />
        <TaskDescription>{task.description}</TaskDescription>
      </TaskDescriptionWrapper>
      {task.userSubTasks.map(el => (
        <TowerTaskRow isInTowerInfo={true} task={el} key={el.id} />
      ))}
      <Border />
      <RowWrapper style={taskRowStyledConfig.rowWrapper}>
        <TaskTimer
          expireInSeconds={task.expireInSeconds}
          towerTitle={task.productSlug}
        />
        <RowWrapper>
          <ColumnWrapper {...taskRowStyledConfig.columnWrapper}>
            <TaskLoot
              money={task.money}
              energy={task.energy}
              isInTowerInfo={isInTowerInfo}
            />
          </ColumnWrapper>
          <ColumnWrapper
            {...taskRowStyledConfig.columnWrapper}
            style={taskRowStyledConfig.columnWrapperAdditionalStyle}
          >
            <RowWrapper>
              <TaskButton
                expireInSeconds={task.expireInSeconds}
                className={task.status}
                onClick={handleWrapperClick}
              />
              {checkTaskStatus(task.status) && (
                <img src={notDoneImg} alt="reject" />
              )}
            </RowWrapper>
            {checkTaskStatus(task.status) && (
              <HintWrapper onClick={handleHintClick} />
            )}
          </ColumnWrapper>
        </RowWrapper>
      </RowWrapper>
    </MissionWrapper>
  );
};
