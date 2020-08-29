import React, { useRef, useState } from 'react';
import { useStore } from 'effector-react';
import { SettingsStore } from '../../../effector/settings/store';
import { useAudio } from '../../../hooks/use-sound';
import { TasksType } from '../../menu/menu-tasks';
import {
  Border,
  checkTaskStatus,
  HintWrapper,
  TaskButton,
  TaskDescription,
  TaskDescriptionWrapper,
  TaskInfo,
  taskRowStyledConfig,
  TaskWrapper,
  Title,
  VectorImg,
} from '../../tasks-view/tower-task-row';
import { ITask, TaskStatuses } from '../../../effector/tasks-store/store';
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

export const TowerMissionRow: React.FC<ITasksRow> = ({
  isInTowerInfo,
  taskData,
}) => {
  const { taskTypeSlug: taskType, productSlug: towerTitle } = taskData;

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
      handleTaskClick(taskData, e);
      taskData.status === TaskStatuses.DONE && enable && playRewardSound();
      taskData.status === TaskStatuses.CREATED && enable && playActiveTask();
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
    <TaskWrapper
      ref={taskWrapperRef}
      onClick={handleClick}
      isInTowerInfo={isInTowerInfo}
    >
      <ModalWindow
        {...couponModalConfig}
        displayFlag={isCouponModalWindowOpen}
        cancelHandler={() => setIsCouponModalWindowOpen(false)}
        id={taskData.id}
        towerTitle={towerTitle}
      />
      <TaskInfo>
        <Icon type={taskType} />
        <Title isInTowerInfo={isInTowerInfo}>{taskData.title}</Title>
        <VectorImg ref={vectorRef} />
      </TaskInfo>
      <TaskDescriptionWrapper ref={taskDescriptionRef}>
        <Border />
        <TaskDescription>{taskData.description}</TaskDescription>
      </TaskDescriptionWrapper>
      <Border />
      <RowWrapper style={taskRowStyledConfig.rowWrapper}>
        <TaskTimer
          expireInSeconds={taskData.expireInSeconds}
          towerTitle={taskData.productSlug}
        />
        <RowWrapper>
          <ColumnWrapper {...taskRowStyledConfig.columnWrapper}>
            <TaskLoot
              money={taskData.money}
              energy={taskData.energy}
              isInTowerInfo={isInTowerInfo}
            />
          </ColumnWrapper>
          <ColumnWrapper
            {...taskRowStyledConfig.columnWrapper}
            style={taskRowStyledConfig.columnWrapperAdditionalStyle}
          >
            <RowWrapper>
              <TaskButton
                expireInSeconds={taskData.expireInSeconds}
                className={taskData.status}
                onClick={handleWrapperClick}
              />
              {checkTaskStatus(taskData.status) && (
                <img src={notDoneImg} alt="reject" />
              )}
            </RowWrapper>
            {checkTaskStatus(taskData.status) && (
              <HintWrapper onClick={handleHintClick} />
            )}
          </ColumnWrapper>
        </RowWrapper>
      </RowWrapper>
    </TaskWrapper>
  );
};

export interface ITasksRow {
  taskData: ITask;
  isInTowerInfo: boolean;
  available?: boolean;
}

export interface ITaskLocation {
  isInTowerInfo: boolean;
}

interface ITaskButton {
  expireInSeconds: number | null;
}
