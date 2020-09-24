import React, { useRef, useState } from 'react';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { TaskTimer } from '../../../UI/task-timer';
import { TaskLoot, TaskLootLetterColors } from '../../../UI/task-loot';
import { MissionProgressBarButton } from '../../../UI/mission-progress-bar-button';
import {
  calculateCompletedSubTasksQuantity,
  MissionIcon,
  ReducedMissionTitle,
  ReducedMissionWrapper,
  style,
} from '../reduced-mission-row';
import { ITask } from '../../../effector/tasks-store/store';
import { handleTaskWrapperClick } from '../../tasks-view/menu-task-row';
import styled from 'styled-components';
import { RowWrapper } from '../../../UI/row-wrapper';
import { MTSSans } from '../../../fonts';

const MissionRowWrapper = styled(ReducedMissionWrapper)`
  min-height: 180px;
  padding: 25px 18px 38px 11px;
  cursor: auto;
  justify-content: end;
`;

const MissionDescription = styled.div`
  font-family: ${MTSSans.REGULAR};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.4px;
  color: #ffffff;
`;

export const MissionTitle = styled(ReducedMissionTitle)`
  white-space: initial;
  overflow: initial;
  text-overflow: initial;
`;

export const MissionRow: React.FC<IMissionRow> = ({
  mission,
  isInTowerInfo,
}) => {
  const { taskTypeSlug: taskType } = mission;

  const [isOpened, setIsOpened] = useState(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const completedSubTasksQuantity = calculateCompletedSubTasksQuantity(mission);

  const handleClick = () =>
    handleTaskWrapperClick({
      taskDescriptionRef,
      isOpened,
      setIsOpened,
      taskType,
      vectorRef,
    });

  return (
    <MissionRowWrapper
      ref={taskWrapperRef}
      onClick={handleClick}
      isInTowerInfo={isInTowerInfo}
    >
      <MissionIcon marginRight={12} />
      <ColumnWrapper displayFlag={true} position="relative">
        <RowWrapper margin="0 0 20px 0">
          <ColumnWrapper {...style}>
            <MissionTitle isInTowerInfo={isInTowerInfo}>
              {mission.title}
            </MissionTitle>
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
            isInTowerInfo={true}
            color={TaskLootLetterColors.WHITE}
          />
          <MissionProgressBarButton
            task={mission}
            completedSubTasksQuantity={completedSubTasksQuantity}
            style={{ marginLeft: '20px' }}
          />
        </RowWrapper>
        <MissionDescription>{mission.description}</MissionDescription>
      </ColumnWrapper>
    </MissionRowWrapper>
  );
};

interface IMissionRow {
  mission: ITask;
  isInTowerInfo: boolean;
}
