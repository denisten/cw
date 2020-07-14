import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../UI/icons';
import { MTSSans } from '../../../fonts';
import { StyledSpan } from '../../../UI/span';
import { TaskLoot } from '../../../UI/task-loot';
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
import { coughtError } from '../../../effector/error-boundary-store/events';
import vectorImg from './vector.svg';
import { RowWrapper } from '../../../UI/row-wrapper';

const TaskWrapper = styled.div<ITaskLocation>`
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

const Title = styled(StyledSpan)<ITaskLocation>`
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
  width: 100%;
  display: flex;
  align-items: center;
`;

const Border = styled.div`
  width: 635px;
  height: 1px;
  background-color: #e2e5eb;
  margin: 16px 0 14px 0;
`;

const TaskDescription = styled.div`
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

const TaskDescriptionWrapper = styled.div`
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
    bottom: '4px',
  } as React.CSSProperties,
  columnWrapper: {
    position: 'relative',
    displayFlag: true,
  },
  coupon: {
    marginRight: '33px',
  },
  columnWrapperAdditionalStyle: {
    alignItems: 'center',
  },
  rowWrapper: {
    paddingRight: '20px',
    boxSizing: 'border-box',
    width: '100%',
    justifyContent: 'space-between',
  } as React.CSSProperties,
};

const checkTaskStatus = (status: TaskStatuses) =>
  status === TaskStatuses.REJECTED;

export const Task: React.FC<ITasksRow> = ({
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
      if (taskDescriptionRef.current && type !== TasksType.TUTORIAL_TASK) {
        if (isOpened.current) {
          // taskWrapperRef.current.style.height = TaskWrapperHeight.closed + 'px';
          taskDescriptionRef.current.style.display = 'none';
          taskDescriptionRef.current.style.opacity = '0';
          isOpened.current = false;
        } else {
          // taskWrapperRef.current.style.height = TaskWrapperHeight.opened + 'px';
          taskDescriptionRef.current.style.display = 'flex';
          taskDescriptionRef.current.style.opacity = '1';
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
        <img src={vectorImg} alt="vector" />
      </TaskInfo>
      <TaskDescriptionWrapper ref={taskDescriptionRef}>
        <Border />
        <TaskDescription>{description}</TaskDescription>
      </TaskDescriptionWrapper>
      <Border />
      <RowWrapper style={styledConfig.rowWrapper}>
        {<TaskTimer taskTimer={taskTimer} expireInSeconds={expireInSeconds} />}
        <RowWrapper>
          <ColumnWrapper {...styledConfig.columnWrapper}>
            <TaskLoot
              money={money}
              energy={energy}
              isInTowerInfo={isInTowerInfo}
            />
          </ColumnWrapper>
          <ColumnWrapper
            {...styledConfig.columnWrapper}
            style={styledConfig.columnWrapperAdditionalStyle}
          >
            <TaskButton
              expireInSeconds={expireInSeconds}
              className={status}
              onClick={handleWrapperClick}
            />
            {checkTaskStatus(status) && (
              <img src={notDoneImg} alt="reject" style={styledConfig.img} />
            )}
            {checkTaskStatus(status) && (
              <HintWrapper onClick={handleHintClick} />
            )}
          </ColumnWrapper>
        </RowWrapper>
      </RowWrapper>
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
