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
  TaskSubType,
} from '../../../effector/missions-store/store';
import {
  activateTask,
  fetchTasks,
  takeReward,
  verifyTask,
} from '../../../effector/missions-store/events';

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
  box-shadow: 0 2px 4px 0 #e2e5eb;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: ${props => (props.isInTowerInfo ? '16px 0 16px 16px' : '14px 18px')};
  margin-bottom: 16px;
  cursor: pointer;
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
  width: 109px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1px;
  border-style: solid;
  border-width: 2px;
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-image-slice: 1;
  border-image-source: linear-gradient(to bottom, #027722 -152%, #26cd58 107%);
  background-image: linear-gradient(
      to bottom,
      #1ecc52,
      #26cd58 48%,
      #04aa42 80%,
      #08972f 98%
    ),
    linear-gradient(to bottom, #027722 -152%, #26cd58 107%);
  &.${TaskStatuses.CREATED} {
    border-image-source: linear-gradient(to bottom, #03adc9 1%, #02c5e5 100%);
    background-image: linear-gradient(
        to bottom,
        #00c4e4,
        #04c7e7 48%,
        #0cb4d0 80%,
        #02acc8 98%
      ),
      linear-gradient(to bottom, #03adc9 1%, #02c5e5 100%);
      ::after {
    content: 'Выполнить';
    }
  }
  &.${TaskStatuses.ACTIVE || TaskStatuses.REJECTED}::after {
    content: "${props => props.expireInSeconds}";
  }
  &.${TaskStatuses.VERIFICATION}::after {
    content: 'Проверяем...';
  }
  &.${TaskStatuses.DONE}::after {
    content: 'Забрать';
  }
  &.${TaskStatuses.EXPIRED || TaskStatuses.REWARDED}::after {
    content: 'Время вышло';
  }

  ::after {
    font-family: ${MTSSans.MEDIUM};
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: -0.4px;
    text-align: center;
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

const TimerWrapper = styled.div`
  width: 110px;
  height: 16px;
  box-shadow: inset 0 0 2px 0 rgba(32, 189, 218, 0.18);
  background-color: #d6f0f4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const styledConfig = {
  coupon: {
    marginRight: '12px',
  },
};

const handleClick = (id: number) => {
  const state = MissionsStore.getState();
  const currentMissionIdx = state.findIndex(el => el.id === id);
  switch (state[currentMissionIdx].status) {
    case TaskStatuses.CREATED:
      return activateTask(id);
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
  return (
    <TaskWrapper
      isOpened={isOpened}
      onClick={() => setIsOpened(!isOpened)}
      isInTowerInfo={isInTowerInfo}
    >
      <TaskInfo>
        <Icon type={type} />
        <Title isInTowerInfo={isInTowerInfo}>{taskTitle}</Title>
        <TaskLoot money={money} energy={energy} isInTowerInfo={isInTowerInfo} />
        {status === TaskStatuses.ACTIVE ? (
          <TimerWrapper
            onClick={e => {
              e.stopPropagation();
              handleClick(id);
            }}
          >
            {expireInSeconds}
          </TimerWrapper>
        ) : (
          <TaskButton
            expireInSeconds={expireInSeconds}
            className={status}
            onClick={e => {
              e.stopPropagation();
              handleClick(id);
            }}
          />
        )}
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
  type: TaskSubType;
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
