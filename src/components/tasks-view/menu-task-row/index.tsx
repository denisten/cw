import React, { useRef, useState } from 'react';
import { handleTaskClick } from '../../../utils/handle-task-click';
import { ModalWindow } from '../../modal-window';
import { couponModalConfig } from '../../tower-info/tower-info-chat';
import { Icon } from '../../../UI/icons';
import { RowWrapper } from '../../../UI/row-wrapper';
import { TaskTimer } from '../../../UI/task-timer';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { TaskLoot } from '../../../UI/task-loot';
import notDoneImg from '../tower-task-row/not-done.svg';
import {
  Border,
  checkTaskStatus,
  HintWrapper,
  ITaskLocation,
  ITasksRow,
  TaskButton,
  TaskDescription,
  TaskDescriptionWrapper,
  TaskInfo,
  taskRowStyledConfig,
  VectorImg,
} from '../tower-task-row';
import { TasksType } from '../../menu/menu-tasks';
import styled from 'styled-components';
import { StyledSpan } from '../../../UI/span';
import { MTSSans } from '../../../fonts';
import takeRewardSound from '../../../sound/take-reward.mp3';
import activeTask from '../../../sound/active-task.mp3';
import { useStore } from 'effector-react';
import { SettingsStore } from '../../../effector/settings/store';
import { useAudio } from '../../../hooks/use-sound';
import { TaskStatuses } from '../../../effector/tasks-store/store';

export const TaskWrapper = styled.div<ITaskLocation>`
  width: 719px;
  border-radius: 4px;
  border: 1px solid #ebecef;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 14px 18px;
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const Title = styled(StyledSpan)<ITaskLocation>`
  min-width: 305px;
  font-family: ${MTSSans.MEDIUM};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #001424;
  margin-left: 14px;
  font-weight: 500;
  margin-right: 34px;
`;

export const handleTaskWrapperClick = ({
  taskDescriptionRef,
  taskType,
  vectorRef,
  isOpened,
  setIsOpened,
}: IHandleTaskWrapperClick) =>
  requestAnimationFrame(() => {
    if (
      taskDescriptionRef.current &&
      taskType !== TasksType.TUTORIAL_TASK &&
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

export const MenuTaskRow: React.FC<ITasksRow> = ({
  isInTowerInfo,
  taskData,
}) => {
  const taskType = taskData.taskTypeSlug;
  const towerTitle = taskData.productSlug;

  const [isOpened, setIsOpened] = useState(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const [isCouponModalWindowOpen, setIsCouponModalWindowOpen] = useState(false);

  const {
    sound: { enable, volume },
  } = useStore(SettingsStore);
  const { play: playRewardSound } = useAudio(takeRewardSound, false, volume);
  const { play: playActiveTask } = useAudio(activeTask, false, volume);

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
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleTaskWrapperClick({
      taskDescriptionRef,
      isOpened,
      setIsOpened,
      taskType,
      vectorRef,
    });
  };

  const handleHintClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCouponModalWindowOpen(true);
  };

  return (
    <>
      <TaskWrapper
        ref={taskWrapperRef}
        onClick={handleClick}
        isInTowerInfo={isInTowerInfo}
      >
        <TaskInfo>
          <Icon type={taskType} />
          <Title isInTowerInfo={isInTowerInfo}>{taskData.title}</Title>
          <RowWrapper>
            <ColumnWrapper {...taskRowStyledConfig.columnWrapper}>
              <TaskLoot
                money={taskData.money}
                energy={taskData.energy}
                isInTowerInfo={isInTowerInfo}
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

            <VectorImg ref={vectorRef} />
          </RowWrapper>
        </TaskInfo>
        <TaskDescriptionWrapper ref={taskDescriptionRef}>
          <Border />
          <TaskDescription>{taskData.description}</TaskDescription>
        </TaskDescriptionWrapper>
      </TaskWrapper>
      <ModalWindow
        {...couponModalConfig}
        displayFlag={isCouponModalWindowOpen}
        cancelHandler={() => setIsCouponModalWindowOpen(false)}
        id={taskData.id}
        towerTitle={towerTitle}
      />
    </>
  );
};

interface IHandleTaskWrapperClick {
  taskDescriptionRef: React.RefObject<HTMLDivElement>;
  taskType: TasksType;
  vectorRef: React.RefObject<HTMLDivElement>;
  isOpened: boolean;
  setIsOpened: Function;
}
