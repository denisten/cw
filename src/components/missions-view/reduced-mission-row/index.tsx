import React, { useRef, useState } from 'react';
import { TaskWrapper } from '../../tasks-view/tower-task-row';
import { ITask, TaskStatuses } from '../../../effector/tasks-store/store';
import { TaskLoot } from '../../../UI/task-loot';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { handleTaskWrapperClick } from '../../tasks-view/menu-task-row';
import { TaskTimer } from '../../../UI/task-timer';
import styled from 'styled-components';
import { MissionProgressBarButton } from '../../../UI/mission-progress-bar-button';
import rocketImg from './icon.svg';
import { StyledSpan } from '../../../UI/span';
import { MTSSans } from '../../../fonts';
import arrowImg from './arrow.svg';

enum MissionWrapperHeight {
  SMALL = 72,
  BIG = 191,
}

const MissionWrapper = styled(TaskWrapper)<IMissionWrapper>`
  height: ${props =>
    props.needFullDescription
      ? MissionWrapperHeight.BIG
      : MissionWrapperHeight.SMALL}px;
  width: 491px;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  overflow: hidden;
  padding: 11px 19px 12px 11px;
  background: linear-gradient(90.56deg, #2f5ccf 0%, #6412cc 99.76%);
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 15px;
  user-select: none;
  cursor: pointer;
  color: #fff !important ;
`;

const MissionTitle = styled(StyledSpan)`
  font-family: ${MTSSans.MEDIUM};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  font-weight: 500;
`;

const MissionIcon = styled.img.attrs({ src: rocketImg })`
  margin-right: 12px;
`;

const Arrow = styled.img.attrs({ src: arrowImg })`
  margin-left: 20px;
`;

export const calculateCompletedSubTasksQuantity = (mission: ITask) => {
  const wantedTaskStatusesSet = new Set([TaskStatuses.REWARDED]);
  return mission.userSubTasks.filter(el => wantedTaskStatusesSet.has(el.status))
    .length;
};

const style = {
  displayFlag: true,
  position: 'relative',
  maxWidth: '177px',
  margin: '0 16px 0 0',
};

export const MissionRow: React.FC<IMissionRow> = ({
  callback,
  mission,
  needFullDescription,
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
    <MissionWrapper
      needFullDescription={needFullDescription}
      ref={taskWrapperRef}
      onClick={handleClick}
      isInTowerInfo={true}
    >
      <MissionIcon />
      <ColumnWrapper {...style}>
        <MissionTitle>{mission.title}</MissionTitle>
        {mission.localExpireInSeconds && (
          <TaskTimer
            expireInSeconds={mission.localExpireInSeconds}
            towerTitle={mission.productSlug}
          />
        )}
      </ColumnWrapper>
      <TaskLoot money={mission.money} energy={0} isInTowerInfo={true} />
      <MissionProgressBarButton
        task={mission}
        completedSubTasksQuantity={completedSubTasksQuantity}
      />
      {!needFullDescription && <Arrow />}
    </MissionWrapper>
  );
};

interface IMissionRow extends IMissionWrapper {
  mission: ITask;
  callback?: Function;
}

interface IMissionWrapper {
  needFullDescription: boolean;
}
