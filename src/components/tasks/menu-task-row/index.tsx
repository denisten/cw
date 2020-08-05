import React, { useRef, useState } from 'react';
import { handleTaskClick } from '../../../utils/handle-task-click';
import { ModalWindow } from '../../modal-window';
import { couponModalConfig } from '../../tower-info/tower-info-chat';
import { Icon } from '../../../UI/icons';
import vectorImg from '../tower-task-row/vector.svg';
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

const TaskWrapper = styled.div<ITaskLocation>`
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

const Title = styled(StyledSpan)<ITaskLocation>`
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
  type,
  taskTitle,
  status,
  money,
  energy,
  description,
  towerTitle,
  isInTowerInfo,
  id,
  expireInSeconds,
  taskTimer,
}) => {
  const isOpened = useRef(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const [isCouponModalWindowOpen, setIsCouponModalWindowOpen] = useState(false);

  const handleWrapperClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === TasksType.TUTORIAL_TASK) {
      // do next tutorial step in future
    } else {
      await handleTaskClick(id, e);
    }
  };

  const handleTaskWrapperClick = () =>
    requestAnimationFrame(() => {
      if (
        taskDescriptionRef.current &&
        type !== TasksType.TUTORIAL_TASK &&
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
    <TaskWrapper
      ref={taskWrapperRef}
      onClick={handleTaskWrapperClick}
      isInTowerInfo={isInTowerInfo}
    >
      <ModalWindow
        {...couponModalConfig}
        displayFlag={isCouponModalWindowOpen}
        cancelHandler={() => setIsCouponModalWindowOpen(false)}
        id={id}
        towerTitle={towerTitle}
      />
      <TaskInfo>
        <Icon type={type} />
        <Title isInTowerInfo={isInTowerInfo}>{taskTitle}</Title>
        <RowWrapper>
          <ColumnWrapper {...taskRowStyledConfig.columnWrapper}>
            <TaskLoot
              money={money}
              energy={energy}
              isInTowerInfo={isInTowerInfo}
            />
            {
              <TaskTimer
                taskTimer={taskTimer}
                expireInSeconds={expireInSeconds}
              />
            }
          </ColumnWrapper>
          <ColumnWrapper
            {...taskRowStyledConfig.columnWrapper}
            style={taskRowStyledConfig.columnWrapperAdditionalStyle}
          >
            <RowWrapper>
              <TaskButton
                expireInSeconds={expireInSeconds}
                className={status}
                onClick={handleWrapperClick}
              />
              {checkTaskStatus(status) && <img src={notDoneImg} alt="reject" />}
            </RowWrapper>
            {checkTaskStatus(status) && (
              <HintWrapper onClick={handleHintClick} />
            )}
          </ColumnWrapper>

          <VectorImg ref={vectorRef} src={vectorImg} alt="vector" />
        </RowWrapper>
      </TaskInfo>
      <TaskDescriptionWrapper ref={taskDescriptionRef}>
        <Border />
        <TaskDescription>{description}</TaskDescription>
      </TaskDescriptionWrapper>
    </TaskWrapper>
  );
};
