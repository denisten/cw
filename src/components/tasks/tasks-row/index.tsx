import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../UI/icons';
import { MTSSans } from '../../../fonts';
import { StyledSpan } from '../../../UI/span';
import { TaskLoot } from '../../../UI/task-loot';
import { Coupon } from '../../../UI/coupon';
import notDoneImg from './not-done.svg';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { TaskTimer } from '../../../UI/task-timer';
import { TasksType } from '../index';
import { TowersTypes } from '../../../effector/towers-progress/store';
import { TaskStatuses } from '../../../api/tasks/get-tasks';
import { ModalWindow } from '../../modal-window';
import { couponModalConfig } from '../../tower-info-chat';
import { couponHandler } from '../../../utils/coupon-handler';
import { handleTaskClick } from '../../../utils/handle-task-click';
import { useStore } from 'effector-react';
import { UserDataStore } from '../../../effector/user-data/store';
import {
  TaskWrapperHeight,
  TitleMarginLeft,
  TitleMarginRight,
  TitleWidth,
} from '../../../utils/handle-task-click/const';
import { coughtError } from '../../../effector/error-boundary-store/events';

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

const TaskButton = styled.div<ITaskButton>`
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
    content: 'Использовате купон';
  }
`;

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

const checkTaskStatus = (status: TaskStatuses) =>
  status === TaskStatuses.REJECTED;

const checkTaskType = (type: TasksType) => type !== TasksType.INFORMATIONAL;

export const Task: React.FC<ITasksRow> = ({
  type,
  taskTitle,
  status,
  money,
  energy,
  description,
  towerTitle,
  isAllowedToChange,
  isInTowerInfo,
  id,
  expireInSeconds,
  taskTimer,
}) => {
  const isOpened = useRef(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
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
        <ColumnWrapper {...styledConfig.columnWrapper}>
          <TaskLoot
            money={money}
            energy={energy}
            isInTowerInfo={isInTowerInfo}
          />
          {expireInSeconds && <TaskTimer taskTimer={taskTimer} />}
        </ColumnWrapper>
        {checkTaskStatus(status) && (
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
          {checkTaskStatus(status) && <HintWrapper onClick={handleHintClick} />}
        </ColumnWrapper>
      </TaskInfo>
      <Border />
      <TaskDescriptionWrapper>
        <TaskDescription>{description}</TaskDescription>
        {checkTaskType(type) && (
          <Coupon
            style={styledConfig.coupon}
            couponsCount={couponsCount}
            isAllowedToChange={isAllowedToChange}
          />
        )}
      </TaskDescriptionWrapper>
    </TaskWrapper>
  );
};

interface ITasksRow {
  towerTitle: TowersTypes | undefined;
  id: number;
  type: TasksType;
  taskTitle: string;
  status: TaskStatuses;
  money: number;
  expireInSeconds: number | null;
  energy: number;
  description: string;
  isAllowedToChange: boolean;
  width?: number;
  isInTowerInfo: boolean;
  taskTimer?: () => number;
}

export interface ITaskLocation {
  isInTowerInfo: boolean;
}

interface ITaskButton {
  expireInSeconds: number | null;
}
