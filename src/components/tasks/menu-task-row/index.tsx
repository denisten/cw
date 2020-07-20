import React, { useRef, useState } from 'react';
import { useStore } from 'effector-react';
import { UserDataStore } from '../../../effector/user-data/store';
import { handleTaskClick } from '../../../utils/handle-task-click';
import { couponHandler } from '../../../utils/coupon-handler';
import { coughtError } from '../../../effector/error-boundary-store/events';
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
  ITasksRow,
  TaskButton,
  TaskDescription,
  TaskDescriptionWrapper,
  TaskInfo,
  taskRowStyledConfig,
  TaskWrapper,
  Title,
  VectorImg,
} from '../tower-task-row';
import { TasksType } from '../../menu/menu-tasks';

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
  const { couponsCount } = useStore(UserDataStore);

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

  const modalWindowSubmitHandler = async () => {
    if (couponsCount - 1 > 0) {
      await couponHandler(id, 1, towerTitle);
      setIsCouponModalWindowOpen(false);
    } else {
      coughtError({ text: 'Кончились купоны.' });
    }
  };

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
        submitHandler={modalWindowSubmitHandler}
      />
      <TaskInfo>
        <Icon type={type} />
        <Title isInTowerInfo={isInTowerInfo}>{taskTitle}</Title>
        <VectorImg ref={vectorRef} src={vectorImg} alt="vector" />
      </TaskInfo>
      <TaskDescriptionWrapper ref={taskDescriptionRef}>
        <Border />
        <TaskDescription>{description}</TaskDescription>
      </TaskDescriptionWrapper>
      <Border />
      <RowWrapper style={taskRowStyledConfig.rowWrapper}>
        {<TaskTimer taskTimer={taskTimer} expireInSeconds={expireInSeconds} />}
        <RowWrapper>
          <ColumnWrapper {...taskRowStyledConfig.columnWrapper}>
            <TaskLoot
              money={money}
              energy={energy}
              isInTowerInfo={isInTowerInfo}
            />
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
        </RowWrapper>
      </RowWrapper>
    </TaskWrapper>
  );
};
