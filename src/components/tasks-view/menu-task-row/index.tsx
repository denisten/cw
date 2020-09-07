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
import styled from 'styled-components';
import { StyledSpan } from '../../../UI/span';
import { MTSSans } from '../../../fonts';
import takeRewardSound from '../../../sound/take-reward.mp3';
import activeTask from '../../../sound/active-task.mp3';
import { useStore } from 'effector-react';
import { SettingsStore } from '../../../effector/settings/store';
import { useAudio } from '../../../hooks/use-sound';
import { TaskStatuses } from '../../../effector/tasks-store/store';
import { TaskTypes } from '../../../app';

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
  margin: 0 34px 0 14px;
  font-weight: 500;
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
      taskType !== TaskTypes.TUTORIAL_TASK &&
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
  task,
  available = true,
  taskType,
}) => {
  const { taskTypeSlug, productSlug: towerTitle } = task;

  const [isOpened, setIsOpened] = useState(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const [isCouponModalWindowOpen, setIsCouponModalWindowOpen] = useState(false);

  const {
    sound: { volume },
  } = useStore(SettingsStore);
  const { play: playRewardSound } = useAudio(takeRewardSound, false, volume);
  const { play: playActiveTask } = useAudio(activeTask, false, volume);

  const taskButtonHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    task.status === TaskStatuses.DONE && volume && playRewardSound();
    task.status === TaskStatuses.CREATED && volume && playActiveTask();
    await handleTaskClick({ task, e, taskType });
  };
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleTaskWrapperClick({
      taskDescriptionRef,
      isOpened,
      setIsOpened,
      taskType: taskTypeSlug,
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
          <Icon type={available ? taskTypeSlug : TaskStatuses.NOT_AVAILABLE} />
          <Title isInTowerInfo={isInTowerInfo}>{task.title}</Title>
          {available && (
            <RowWrapper>
              <ColumnWrapper {...taskRowStyledConfig.columnWrapper}>
                <TaskLoot
                  money={task.money}
                  energy={task.energy}
                  isInTowerInfo={isInTowerInfo}
                />
                <TaskTimer
                  expireInSeconds={task.expireInSeconds}
                  towerTitle={task.productSlug}
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
                    onClick={taskButtonHandler}
                  />
                  {checkTaskStatus(task.status) && (
                    <img src={notDoneImg} alt="reject" />
                  )}
                </RowWrapper>
                {checkTaskStatus(task.status) && (
                  <HintWrapper onClick={handleHintClick} />
                )}
              </ColumnWrapper>
              <VectorImg ref={vectorRef} />
            </RowWrapper>
          )}
        </TaskInfo>
        <TaskDescriptionWrapper ref={taskDescriptionRef}>
          <Border />
          <TaskDescription>{task.description}</TaskDescription>
        </TaskDescriptionWrapper>
      </TaskWrapper>
      <ModalWindow
        {...couponModalConfig}
        displayFlag={isCouponModalWindowOpen}
        cancelHandler={() => setIsCouponModalWindowOpen(false)}
        id={task.id}
        towerTitle={towerTitle}
      />
    </>
  );
};

interface IHandleTaskWrapperClick {
  taskDescriptionRef: React.RefObject<HTMLDivElement>;
  taskType: TaskTypes;
  vectorRef: React.RefObject<HTMLDivElement>;
  isOpened: boolean;
  setIsOpened: Function;
}
