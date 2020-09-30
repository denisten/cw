import React, { useState } from 'react';
import styled from 'styled-components';
import { ITask } from '../../../effector/tasks-store/store';
import { MissionWrapperWidth } from '../../missions-view/reduced-mission-row';
import { Icon } from '../../../UI/icons';
import { MTSSans } from '../../../fonts';
import { TaskLoot } from '../../../UI/task-loot';
import { handleTaskClick } from '../../../utils/handle-task-click';
import { CSSTransition } from 'react-transition-group';
import { TaskButton } from '../../../UI/task-button';
import { checkTaskStatus } from '../../../UI/mission-progress-bar-button';
import { Hint } from '../../hint';
import { openCouponModalWindow } from '../../../effector/coupon-MW-store/events';

enum TaskRowWrapperPadding {
  IN_TOWER_INFO = '15px 16px 15px 15px',
  NOT_IN_TOWER_INFO = '15px 24px 15px 15px',
}

enum TitleWidth {
  IN_TOWER_INFO = 174,
  NOT_IN_TOWER_INFO = 341,
}

enum TitleMargin {
  IN_TOWER_INFO = '0 5px 0 16px',
  NOT_IN_TOWER_INFO = '0 40px 0 16px',
}

const wrapperClassName = 'wrapper';

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TaskRowWrapper = styled.div<ITaskRowWrapper>`
  display: flex;
  align-items: center;
  width: ${props =>
    props.isInTowerInfo
      ? MissionWrapperWidth.IN_TOWER_INFO
      : MissionWrapperWidth.NOT_IN_TOWER_INFO}px;
  height: 62px;
  padding: ${props =>
    props.isInTowerInfo
      ? TaskRowWrapperPadding.IN_TOWER_INFO
      : TaskRowWrapperPadding.NOT_IN_TOWER_INFO};
  box-sizing: border-box;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out 0.2s;
`;

const Title = styled.div<ITaskRowWrapper>`
  width: ${props =>
    props.isInTowerInfo
      ? TitleWidth.IN_TOWER_INFO
      : TitleWidth.NOT_IN_TOWER_INFO}px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: ${MTSSans.MEDIUM};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.4px;
  color: #040324;
  margin: ${props =>
    props.isInTowerInfo
      ? TitleMargin.IN_TOWER_INFO
      : TitleMargin.NOT_IN_TOWER_INFO};
  transition: all 0.2s ease-in-out 0s;
`;

const Description = styled.div`
  font-family: ${MTSSans.REGULAR};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.4px;
  color: #040324;
  margin: 0 23px 22px 21px;
  transition: opacity 0.2s ease-in-out 0.2s;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #ebecef;
  border-radius: 15px;
  max-height: 62px;
  overflow: hidden;
  user-select: none;
  transition: all 0.2s ease-in-out;
  margin-bottom: 18px;
  &.${wrapperClassName}-enter,
    &.${wrapperClassName}-exit-active,
    &.${wrapperClassName}-exit-done {
    max-height: 62px;
    ${Title} {
      white-space: nowrap;
    }
    ${Description} {
      opacity: 0;
    }
  }
  &.${wrapperClassName}-enter-active,
    &.${wrapperClassName}-enter-done,
    &.${wrapperClassName}-exit {
    max-height: 500px;
    ${Title} {
      white-space: unset;
    }
    ${Description} {
      opacity: 1;
    }
    ${TaskRowWrapper} {
      height: auto;
    }
  }
`;
export const TaskRow: React.FC<ITaskRow2> = ({ task, isInTowerInfo }) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggle = () => setIsOpened(prevState => !prevState);
  const hintCallback = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCouponModalWindow({ towerTitle: task.productSlug, taskId: task.id });
  };
  return (
    <CSSTransition classNames={wrapperClassName} in={isOpened} timeout={0}>
      <Wrapper onClick={toggle}>
        <TaskRowWrapper isInTowerInfo={isInTowerInfo}>
          <Icon type={task.taskTypeSlug} />
          <Title isInTowerInfo={isInTowerInfo}> {task.title} </Title>
          <TaskLoot
            energy={task.energy}
            money={task.money}
            isInTowerInfo={isInTowerInfo}
          />
          <ButtonWrapper>
            <TaskButton
              className={task.status}
              expireInSeconds={task.expireInSeconds}
              onClick={e => {
                e.stopPropagation();
                handleTaskClick({ task, e, taskType: task.taskTypeSlug });
              }}
            />
            {checkTaskStatus(task.status) && <Hint callback={hintCallback} />}
          </ButtonWrapper>
        </TaskRowWrapper>
        <Description>{task.description}</Description>
      </Wrapper>
    </CSSTransition>
  );
};

interface ITaskRow2 extends ITaskRowWrapper {
  task: ITask;
  isInTowerInfo: boolean;
}

export interface ITaskRowWrapper {
  isInTowerInfo: boolean;
}
