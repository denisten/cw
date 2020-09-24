import React, { useRef, useState } from 'react';
import { TaskWrapper } from '../../tasks-view/tower-task-row';
import { ITask, TaskStatuses } from '../../../effector/tasks-store/store';
import { TaskLoot, TaskLootLetterColors } from '../../../UI/task-loot';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { handleTaskWrapperClick } from '../../tasks-view/menu-task-row';
import { TaskTimer } from '../../../UI/task-timer';
import styled from 'styled-components';
import { MissionProgressBarButton } from '../../../UI/mission-progress-bar-button';
import rocketImg from './icon.svg';
import { StyledSpan } from '../../../UI/span';
import { MTSSans } from '../../../fonts';
import arrowImg from './arrow.svg';

const defaultMissionIconMarginRight = 12;
export enum ReducedMissionWrapperWidth {
  IN_TOWER_INFO = 491,
  NOT_IN_TOWER_INFO = 719,
}

export const ReducedMissionWrapper = styled(TaskWrapper)`
  height: 72px;
  width: ${props =>
    props.isInTowerInfo
      ? ReducedMissionWrapperWidth.IN_TOWER_INFO
      : ReducedMissionWrapperWidth.NOT_IN_TOWER_INFO}px;
  min-height: 72px;
  display: flex;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  padding: 11px 19px 12px 11px;
  background: linear-gradient(90.56deg, #2f5ccf 0%, #6412cc 99.76%);
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 15px;
  user-select: none;
  cursor: pointer;
`;
enum ReducedMissionTitleWidth {
  IN_TOWER_INFO = 160,
  NOT_IN_TOWER_INFO = 380,
}
export const ReducedMissionTitle = styled(StyledSpan)<IReducedMissionTitle>`
  font-family: ${MTSSans.MEDIUM};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${props =>
    props.isInTowerInfo
      ? ReducedMissionTitleWidth.IN_TOWER_INFO
      : ReducedMissionTitleWidth.NOT_IN_TOWER_INFO}px;
`;
export const MissionIcon = styled.img.attrs({ src: rocketImg })<IMissionIcon>`
  margin-right: ${props =>
    props.marginRight || defaultMissionIconMarginRight}px;
`;

const Arrow = styled.img.attrs({ src: arrowImg })`
  margin-left: 20px;
`;

export const calculateCompletedSubTasksQuantity = (mission: ITask) => {
  const wantedTaskStatusesSet = new Set([TaskStatuses.REWARDED]);
  return mission.userSubTasks.filter(el => wantedTaskStatusesSet.has(el.status))
    .length;
};

export const style = {
  displayFlag: true,
  position: 'relative',
  margin: '0 16px 0 0',
};

export const ReducedMissionRow: React.FC<IReducedMissionRow> = ({
  callback,
  mission,
  isInTowerInfo,
}) => {
  const { taskTypeSlug: taskType } = mission;

  const [isOpened, setIsOpened] = useState(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const completedSubTasksQuantity = calculateCompletedSubTasksQuantity(mission);

  const handleClick = () => {
    callback && callback(mission);
    handleTaskWrapperClick({
      taskDescriptionRef,
      isOpened,
      setIsOpened,
      taskType,
      vectorRef,
    });
  };
  return (
    <ReducedMissionWrapper
      ref={taskWrapperRef}
      onClick={handleClick}
      isInTowerInfo={isInTowerInfo}
    >
      <MissionIcon />
      <ColumnWrapper {...style}>
        <ReducedMissionTitle isInTowerInfo={isInTowerInfo}>
          {mission.title}
        </ReducedMissionTitle>
        {mission.localExpireInSeconds && (
          <TaskTimer
            expireInSeconds={mission.localExpireInSeconds}
            towerTitle={mission.productSlug}
          />
        )}
      </ColumnWrapper>
      <TaskLoot
        money={mission.money}
        energy={0}
        isInTowerInfo={isInTowerInfo}
        color={TaskLootLetterColors.WHITE}
      />
      <MissionProgressBarButton
        task={mission}
        completedSubTasksQuantity={completedSubTasksQuantity}
      />
      <Arrow />
    </ReducedMissionWrapper>
  );
};

export interface IReducedMissionRow extends IReducedMissionTitle {
  mission: ITask;
  callback?: Function;
}

interface IMissionIcon {
  marginRight?: number;
}

interface IReducedMissionTitle {
  isInTowerInfo: boolean;
}
