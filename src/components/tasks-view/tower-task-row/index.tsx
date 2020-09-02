import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../UI/icons';
import { MTSSans } from '../../../fonts';
import { StyledSpan } from '../../../UI/span';
import { TaskLoot } from '../../../UI/task-loot';
import notDoneImg from './not-done.svg';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { TaskTimer } from '../../../UI/task-timer';
import { ModalWindow } from '../../modal-window';
import { handleTaskClick } from '../../../utils/handle-task-click';
import vectorImg from './vector.svg';
import { RowWrapper } from '../../../UI/row-wrapper';
import { couponModalConfig } from '../../tower-info/tower-info-chat';
import { ITask, TaskStatuses } from '../../../effector/tasks-store/store';
import takeRewardSound from '../../../sound/take-reward.mp3';
import activeTask from '../../../sound/active-task.mp3';
import { SettingsStore } from '../../../effector/settings/store';
import { useStore } from 'effector-react';
import { useAudio } from '../../../hooks/use-sound';
import completedImg from './completed.svg';
import { handleTaskWrapperClick } from '../menu-task-row';
import { TaskTypes } from '../../../app';

export const TaskWrapper = styled.div<ITaskLocation>`
  width: 100%;
  min-height: 125px;
  border-radius: 4px;
  border: 1px solid #ebecef;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: ${props => (props.isInTowerInfo ? '16px 0 16px 16px' : '14px 18px')};
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const Title = styled(StyledSpan)<ITaskLocation>`
  max-width: 405px;
  font-family: ${MTSSans.MEDIUM};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #001424;
  margin-left: 14px;
  font-weight: 500;
  min-width: 398px;
  margin-right: 7px;
`;

export const TaskButton = styled.div<ITaskButton>`
  width: 120px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  cursor: pointer;
  &.${TaskStatuses.CREATED} {
    background: #02adc9;
    ::after {
      content: 'Выполнить';
    }
  }
  &.${TaskStatuses.ACTIVE} {
    border: 1px solid #76a2a9;
    box-sizing: border-box;
    background: #fff;
    ::after {
      content: 'Выполняется';
      color: #76a2a9;
    }
  }
  &.${TaskStatuses.VERIFICATION} {
    background: #fff;
    ::after {
      content: 'На проверке';
      color: #76a2a9;
    }
  }
  &.${TaskStatuses.DONE} {
    background: #40b71e;
    border-radius: 2px;
    ::after {
      content: 'Забрать';
      color: #fff;
    }
  }

  &.${TaskStatuses.REJECTED} {
    background: #fff;
    border-radius: 2px;
    ::after {
      content: 'Не выполнено';
      color: #76a2a9;
    }
  }
  &.${TaskStatuses.REWARDED} {
    background-image: url(${completedImg});
    background-size: contain;
    background-repeat: no-repeat;
  }
  ::after {
    font-family: ${MTSSans.MEDIUM};
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.4px;
    color: #ffffff;
  }
`;

export const TaskInfo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Border = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e2e5eb;
  margin: 16px 0 14px 0;
`;

export const TaskDescription = styled.div`
  width: 560px;
  height: auto;
  font-family: ${MTSSans.REGULAR};
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.35px;
  color: #001424;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const TaskDescriptionWrapper = styled.div`
  width: 100%;
  height: auto;
  justify-content: space-between;
  flex-direction: column;
  display: none;
  opacity: 0;
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
`;

export const HintWrapper = styled.div`
  font-family: ${MTSSans.REGULAR};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: -0.4px;
  text-decoration-line: underline;
  cursor: pointer;
  color: #03adc9;
  ::after {
    content: 'Использовате купон';
  }
`;

export const VectorImg = styled.img.attrs({ src: vectorImg, alt: 'vector' })`
  transition-timing-function: ease-in-out;
  transition-property: transform;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;
`;

export const taskRowStyledConfig = {
  columnWrapper: {
    position: 'relative',
    displayFlag: true,
  },
  coupon: {
    marginRight: '33px',
  },
  columnWrapperAdditionalStyle: {
    alignItems: 'center',
    marginRight: '10px',
    width: '115px',
    justifyContent: 'center',
  },
  rowWrapper: {
    paddingRight: '20px',
    boxSizing: 'border-box',
    width: '100%',
    justifyContent: 'space-between',
  } as React.CSSProperties,
};

export const checkTaskStatus = (status: TaskStatuses) =>
  status === TaskStatuses.REJECTED;

export const TowerTaskRow: React.FC<ITasksRow> = ({
  isInTowerInfo,
  task,
  taskType,
}) => {
  const { taskTypeSlug, productSlug: towerTitle } = task;

  const [isOpened, setIsOpened] = useState(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const {
    sound: { volume },
  } = useStore(SettingsStore);
  const { play: playRewardSound } = useAudio(takeRewardSound, false, volume);
  const { play: playActiveTask } = useAudio(activeTask, false, volume);

  const [isCouponModalWindowOpen, setIsCouponModalWindowOpen] = useState(false);

  const handleWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (taskTypeSlug === TaskTypes.TUTORIAL_TASK) {
      // do next tutorial step in future
    } else {
      handleTaskClick({ taskData: task, e, taskType });
      task.status === TaskStatuses.DONE && volume && playRewardSound();
      task.status === TaskStatuses.CREATED && volume && playActiveTask();
    }
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
    <TaskWrapper
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
        <Icon type={taskTypeSlug} />
        <Title isInTowerInfo={isInTowerInfo}>{task.title}</Title>
        <VectorImg ref={vectorRef} />
      </TaskInfo>
      <TaskDescriptionWrapper ref={taskDescriptionRef}>
        <Border />
        <TaskDescription>{task.description}</TaskDescription>
      </TaskDescriptionWrapper>
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
    </TaskWrapper>
  );
};

export interface ITasksRow {
  task: ITask;
  isInTowerInfo: boolean;
  available?: boolean;
  taskType: TaskTypes;
}

export interface ITaskLocation {
  isInTowerInfo: boolean;
}

interface ITaskButton {
  expireInSeconds: number | null;
}
