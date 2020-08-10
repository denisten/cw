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
  min-width: 316px;
  font-family: ${MTSSans.MEDIUM};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #001424;
  margin-left: 14px;
  font-weight: 500;
  margin-right: 34px;
`;

export const MenuTaskRow: React.FC<ITasksRow> = ({
  isInTowerInfo,
  taskData,
  // type,
  // taskTitle,
  // status,
  // money,
  // energy,
  // description,
  // towerTitle,
  // id,
  // expireInSeconds,
  // taskTimer,
}) => {
  const taskType = taskData.task.content.taskType.slug;
  const towerTitle = taskData.task.content.product.slug;

  const isOpened = useRef(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const [isCouponModalWindowOpen, setIsCouponModalWindowOpen] = useState(false);

  const handleWrapperClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (taskType === TasksType.TUTORIAL_TASK) {
      // do next tutorial step in future
    } else {
      await handleTaskClick(taskData.id, e);
    }
  };

  const handleTaskWrapperClick = () =>
    requestAnimationFrame(() => {
      if (
        taskDescriptionRef.current &&
        taskType !== TasksType.TUTORIAL_TASK &&
        vectorRef.current
      ) {
        if (isOpened.current) {
          taskDescriptionRef.current.style.display = 'none';
          taskDescriptionRef.current.style.opacity = '0';
          vectorRef.current.style.transform = 'rotate(0deg)';
          isOpened.current = false;
        } else {
          taskDescriptionRef.current.style.display = 'flex';
          taskDescriptionRef.current.style.opacity = '1';
          vectorRef.current.style.transform = 'rotate(180deg)';
          isOpened.current = true;
        }
      }
    });

  const handleHintClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCouponModalWindowOpen(true);
  };

  return (
    <>
      <TaskWrapper
        ref={taskWrapperRef}
        onClick={handleTaskWrapperClick}
        isInTowerInfo={isInTowerInfo}
      >
        <TaskInfo>
          <Icon type={taskType} />
          <Title isInTowerInfo={isInTowerInfo}>
            {taskData.task.content.name}
          </Title>
          <RowWrapper>
            <ColumnWrapper {...taskRowStyledConfig.columnWrapper}>
              <TaskLoot
                money={taskData.task.reward}
                energy={taskData.task.energy}
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
          <TaskDescription>{taskData.task.content.description}</TaskDescription>
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
