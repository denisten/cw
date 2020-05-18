import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../UI/icons';
import { MTSSans } from '../../../fonts';
import { StyledSpan } from '../../../UI/span';
import { TaskLoot } from '../../../UI/task-loot';
import { Coupon } from '../../../UI/coupon';
import {
  TaskStatuses,
  TaskSubType,
} from '../../../effector/missions-store/store';

enum TaskWrapperHeight {
  opened = 149,
  closed = 64,
}

const TaskWrapper = styled.div<ITaskWrapper>`
  width: 674px;
  height: ${props =>
    props.isOpened ? TaskWrapperHeight.opened : TaskWrapperHeight.closed}px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 #e2e5eb;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 14px 18px;
  margin-bottom: 16px;
  cursor: pointer;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: height;
  overflow: hidden;
  position: relative;
`;

const Title = styled(StyledSpan)`
  font-family: ${MTSSans.MEDIUM};
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: #001424;
  margin-left: 14px;
  font-weight: 500;
  width: 274px;
  margin-right: 45px;
`;

const TaskButton = styled.div`
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
  &.done {
    border-image-source: linear-gradient(
      to bottom,
      #027722 -152%,
      #26cd58 107%
    );
    background-image: linear-gradient(
        to bottom,
        #1ecc52,
        #26cd58 48%,
        #04aa42 80%,
        #08972f 98%
      ),
      linear-gradient(to bottom, #027722 -152%, #26cd58 107%);
    ::after {
      content: 'Забрать';
    }
  }
  &.notDone {
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
      content: 'Подтвердить';
    }
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
`;

const TaskDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const styledConfig = {
  coupon: {
    marginRight: '12px',
  },
};

export const TasksRow: React.FC<ITasksRow> = ({
  type,
  taskTitle,
  status,
  money,
  energy,
  description,
  couponsCount,
  isAllowedToChange,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <TaskWrapper isOpened={isOpened} onClick={() => setIsOpened(!isOpened)}>
      <TaskInfo>
        <Icon type={type} />
        <Title>{taskTitle}</Title>
        <TaskLoot money={money} energy={energy} />
        <TaskButton className={status} />
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
  type: TaskSubType;
  taskTitle: string;
  status: TaskStatuses;
  money: number;
  energy: number;
  description: string;
  isAllowedToChange: boolean;
  couponsCount: number;
}

interface ITaskWrapper {
  isOpened: boolean;
}
