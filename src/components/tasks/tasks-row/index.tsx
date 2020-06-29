import React, { useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../UI/icons';
import { MTSSans } from '../../../fonts';
import { StyledSpan } from '../../../UI/span';
import { TaskLoot } from '../../../UI/task-loot';
import { Coupon } from '../../../UI/coupon';
import { MissionsStore } from '../../../effector/missions-store/store';
import {
  activateTask,
  fetchTasks,
  takeReward,
  verifyTask,
} from '../../../effector/missions-store/events';
import notDoneImg from './not-done.svg';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { TaskTimer } from '../../../UI/task-timer';
import {
  chatTaskSession,
  clearChat,
} from '../../../effector/task-messages/events';
import {
  menuClosed,
  setTowerInfoContent,
} from '../../../effector/app-condition/events';
import { BuildingsService } from '../../../buildings/config';
import { scrollToCurrentTower } from '../../../utils/scroll-to-current-tower';
import { TasksType } from '../index';
import {
  AppCondition,
  TowerInfoContentValues,
} from '../../../effector/app-condition/store';
import { hideMarker, setMarker } from '../../../effector/towers-marker/events';
import { TypeOfMarkers } from '../../markers';
import { TowersTypes } from '../../../effector/towers-progress/store';
import { TaskStatuses } from '../../../api/tasks/get-tasks';
import { pushMoveElems } from '../../../effector/reward/events';
import { TaskMessagesStore } from '../../../effector/task-messages/store';

enum TaskWrapperHeight {
  opened = 149,
  closed = 64,
}

enum TitleMarginLeft {
  inTowerInfo = 16,
  notInTowerInfo = 14,
}

enum TitleWidth {
  inTowerInfo = 124,
  notInTowerInfo = 274,
}
enum TitleMarginRight {
  inTowerInfo = 19,
  notInTowerInfo = 45,
}

const TaskWrapper = styled.div<ITaskLocation>`
  width: 100%;
  height: ${TaskWrapperHeight.closed}px;
  border-radius: 4px;
  border: 1px solid #ebecef;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: ${props => (props.isInTowerInfo ? '16px 0 16px 16px' : '14px 18px')};
  margin-bottom: 16px;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: height;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const Title = styled(StyledSpan)<ITaskLocation>`
  font-family: ${MTSSans.MEDIUM};
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: #001424;
  margin-left: ${props =>
    props.isInTowerInfo
      ? TitleMarginLeft.inTowerInfo
      : TitleMarginLeft.notInTowerInfo}px;
  font-weight: 500;
  width: ${props =>
    props.isInTowerInfo ? TitleWidth.inTowerInfo : TitleWidth.notInTowerInfo}px;
  margin-right: ${props =>
    props.isInTowerInfo
      ? TitleMarginRight.inTowerInfo
      : TitleMarginRight.notInTowerInfo}px;
`;

const TaskButton = styled.div<{
  expireInSeconds: number | null;
}>`
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
      content: 'Проверить';
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

const TaskInfo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Border = styled.div`
  width: 635px;
  height: 1px;
  background-color: #e2e5eb;
  margin: 16px 0 8px 0;
`;

const TaskDescription = styled.div`
  width: 560px;
  height: 60px;
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

const TaskDescriptionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const HintWrapper = styled.div`
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
    content: 'Проверить еще раз';
  }
`;

const markerHandler = (status: TaskStatuses, productTitle: TowersTypes) => {
  const state = MissionsStore.getState();
  const numberOfDoneTasksInCurrentProduct = state.filter(
    el =>
      el.task.content.product.slug === productTitle &&
      el.status === TaskStatuses.DONE
  ).length;
  const numberOfTasksInCurrentProduct = state.filter(
    el => el.task.content.product.slug === productTitle
  ).length;
  if (
    status === TaskStatuses.ACTIVE ||
    (status === TaskStatuses.DONE && numberOfDoneTasksInCurrentProduct)
  ) {
    setMarker({
      towerTitle: productTitle,
      type: TypeOfMarkers.SUCCESS,
    });
  } else {
    hideMarker({ towerTitle: productTitle, type: TypeOfMarkers.SUCCESS });
  }

  if (!numberOfTasksInCurrentProduct) {
    hideMarker({ towerTitle: productTitle, type: TypeOfMarkers.TASK });
  }
};

const animateTaskReward = (reward: number, e: React.MouseEvent) => {
  if (reward > 0) {
    pushMoveElems({ x: e.clientX, y: e.clientY, id: 0 });
  }
};
const styledConfig = {
  img: {
    position: 'relative',
    bottom: '10px',
  } as React.CSSProperties,
  columnWrapper: {
    position: 'relative',
    displayFlag: true,
  },
  coupon: {
    marginRight: '12px',
  },
  columnWrapperAdditionalStyle: { alignItems: 'center' },
};

const handleClick = async (id: number, e: React.MouseEvent) => {
  const state = MissionsStore.getState();
  const { selectedMenuItem } = AppCondition.getState();
  const currentMissionIdx = state.findIndex(el => el.id === id);
  const currentMission = state[currentMissionIdx];
  const currentMissionType = currentMission.task.content.taskType.slug;
  const currentTowerTitle = currentMission.task.content.product.slug;
  const productTitle = state[currentMissionIdx].task.content.product.slug;
  const { status } = state[currentMissionIdx];
  const { taskId } = TaskMessagesStore.getState()[productTitle];
  switch (status) {
    case TaskStatuses.CREATED:
      if (!taskId) {
        if (
          currentMissionType !== TasksType.COSMETIC &&
          state[currentMissionIdx].status === TaskStatuses.CREATED
        ) {
          chatTaskSession({ id, towerTitle: productTitle });
          setMarker({
            towerTitle: currentTowerTitle,
            type: TypeOfMarkers.ACTIVE_TASK,
          });
          if (!selectedMenuItem) {
            setTowerInfoContent(TowerInfoContentValues.CHAT);
          } else menuClosed();
        } else {
          activateTask(id);
        }
        scrollToCurrentTower(
          BuildingsService.getConfigForTower(productTitle).ref
        );
      } else if (taskId) {
        alert('нельзя');
      }
      return;
    case TaskStatuses.ACTIVE:
      await verifyTask(id);
      markerHandler(status, productTitle);
      break;
    case TaskStatuses.DONE:
      animateTaskReward(currentMission.task.reward, e);
      await takeReward(id);
      markerHandler(status, productTitle);
      clearChat({ towerTitle: productTitle });
      break;
    case TaskStatuses.VERIFICATION:
      hideMarker({
        towerTitle: currentTowerTitle,
        type: TypeOfMarkers.TAKE_REWARD,
      });
      return fetchTasks('');
    case TaskStatuses.REWARDED:
    case TaskStatuses.REJECTED:
    case TaskStatuses.EXPIRED:
    // do smth
  }
};

const handleHintClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  fetchTasks('');
};

export const Task: React.FC<ITasksRow> = ({
  type,
  taskTitle,
  status,
  money,
  energy,
  description,
  couponsCount,
  isAllowedToChange,
  isInTowerInfo,
  id,
  expireInSeconds,
}) => {
  const isOpened = useRef(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const handleWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === TasksType.TUTORIAL_TASK) {
      // do next tutorial step in future
    } else {
      handleClick(id, e);
    }
  };

  const handleTaskWrapperClick = () => {
    requestAnimationFrame(() => {
      if (taskWrapperRef.current && type !== TasksType.TUTORIAL_TASK) {
        if (isOpened.current) {
          taskWrapperRef.current.style.height = TaskWrapperHeight.closed + 'px';
          isOpened.current = false;
        } else {
          taskWrapperRef.current.style.height = TaskWrapperHeight.opened + 'px';
          isOpened.current = true;
        }
      }
    });
  };

  return (
    <TaskWrapper
      ref={taskWrapperRef}
      onClick={handleTaskWrapperClick}
      isInTowerInfo={isInTowerInfo}
    >
      <TaskInfo>
        <Icon type={type} />
        <Title isInTowerInfo={isInTowerInfo}>{taskTitle}</Title>
        <ColumnWrapper {...styledConfig.columnWrapper}>
          <TaskLoot
            money={money}
            energy={energy}
            isInTowerInfo={isInTowerInfo}
          />
          <TaskTimer secondsLeft={expireInSeconds} />
        </ColumnWrapper>
        {status === TaskStatuses.REJECTED && (
          <img src={notDoneImg} alt="reject" style={styledConfig.img} />
        )}
        <ColumnWrapper
          {...styledConfig.columnWrapper}
          style={styledConfig.columnWrapperAdditionalStyle}
        >
          <TaskButton
            expireInSeconds={expireInSeconds}
            className={status}
            onClick={handleWrapperClick}
          />
          {status === TaskStatuses.REJECTED && (
            <HintWrapper onClick={handleHintClick} />
          )}
        </ColumnWrapper>
      </TaskInfo>
      <Border />
      <TaskDescriptionWrapper>
        <TaskDescription>{description}</TaskDescription>
        <Coupon
          style={styledConfig.coupon}
          couponsCount={couponsCount}
          isAllowedToChange={isAllowedToChange}
        />
      </TaskDescriptionWrapper>
    </TaskWrapper>
  );
};

interface ITasksRow {
  id: number;
  type: TasksType;
  taskTitle: string;
  status: TaskStatuses;
  money: number;
  expireInSeconds: number | null;
  energy: number;
  description: string;
  isAllowedToChange: boolean;
  couponsCount: number;
  width?: number;
  isInTowerInfo: boolean;
}

export interface ITaskLocation {
  isInTowerInfo: boolean;
}
