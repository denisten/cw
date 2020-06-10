import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../UI/icons';
import { MTSSans } from '../../../fonts';
import { StyledSpan } from '../../../UI/span';
import { TaskLoot } from '../../../UI/task-loot';
import { Coupon } from '../../../UI/coupon';
import {
  MissionsStore,
  TaskStatuses,
} from '../../../effector/missions-store/store';
import {
  activateTask,
  fetchTasks,
  takeReward,
  verifyTask,
} from '../../../effector/missions-store/events';
import notDoneImg from './not-done.svg';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { TaskTimer } from '../../../UI/task-timer';
import { chatTaskSession } from '../../../effector/task-messages/events';
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

enum TaskWrapperHeight {
  opened = 149,
  closed = 64,
}

enum TaskWrapperWidth {
  inTower = 474,
  notInTower = 674,
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

const TaskWrapper = styled.div<ITaskWrapper>`
  width: ${props =>
    props.isInTowerInfo
      ? TaskWrapperWidth.inTower
      : TaskWrapperWidth.notInTower}px;
  height: ${props =>
    props.isOpened ? TaskWrapperHeight.opened : TaskWrapperHeight.closed}px;
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
  width: 464px;
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

  color: #03adc9;
  ::after {
    content: 'Проверить еще раз';
  }
`;

const handleClick = (id: number) => {
  const state = MissionsStore.getState();
  const { selectedMenuItem } = AppCondition.getState();
  const currentMissionIdx = state.findIndex(el => el.id === id);
  const currentMission = state[currentMissionIdx];
  const currentMissionType = currentMission.task.content.taskType.slug;
  const productTitle = state[currentMissionIdx].task.content.product.slug;
  switch (state[currentMissionIdx].status) {
    case TaskStatuses.CREATED:
      activateTask(id);
      if (currentMissionType !== TasksType.COSMETIC) {
        chatTaskSession(id);
        if (!selectedMenuItem) {
          setTowerInfoContent(TowerInfoContentValues.CHAT);
        } else menuClosed();
      }
      scrollToCurrentTower(
        BuildingsService.getConfigForTower(productTitle).ref
      );
      return;
    case TaskStatuses.ACTIVE:
      return verifyTask(id);
    case TaskStatuses.DONE:
      return takeReward(id);
    case TaskStatuses.VERIFICATION:
      return fetchTasks('');
    case TaskStatuses.REWARDED:
    case TaskStatuses.REJECTED:
    case TaskStatuses.EXPIRED:
    // do smth
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
  const [isOpened, setIsOpened] = useState(false);
  const handleWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClick(id);
  };

  return (
    <TaskWrapper
      isOpened={isOpened}
      onClick={() => setIsOpened(!isOpened)}
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
          {status === TaskStatuses.REJECTED && <HintWrapper />}
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

interface ITaskWrapper extends ITaskLocation {
  isOpened: boolean;
  width?: number;
}

export interface ITaskLocation {
  isInTowerInfo: boolean;
}
