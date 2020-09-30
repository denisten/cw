import React, { useRef, useState } from 'react';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { TaskTimer } from '../../../UI/task-timer';
import { TaskLoot, TaskLootLetterColors } from '../../../UI/task-loot';
import { MissionProgressBarButton } from '../../../UI/mission-progress-bar-button';
import {
  MissionIcon,
  MissionWrapperWidth,
  ReducedMissionTitleWidth,
  style,
} from '../reduced-mission-row';
import { ITask } from '../../../effector/tasks-store/store';
import styled from 'styled-components';
import { RowWrapper } from '../../../UI/row-wrapper';
import { MTSSans } from '../../../fonts';
import { calculateCompletedSubTasksQuantity } from '../../../utils/calculate-completed-sub-tasks-quantity';
import { TaskTypes } from '../../../app';
import { ITaskRowWrapper } from '../../tasks-view/task-row';

const MissionRowWrapper = styled.div<ITaskRowWrapper>`
  height: 72px;
  width: ${props =>
    props.isInTowerInfo
      ? MissionWrapperWidth.IN_TOWER_INFO
      : MissionWrapperWidth.NOT_IN_TOWER_INFO}px;
  display: flex;
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  background: linear-gradient(90.56deg, #2f5ccf 0%, #6412cc 99.76%);
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 15px;
  user-select: none;
  min-height: 180px;
  padding: 25px 18px 38px 11px;
  cursor: auto;
  justify-content: end;
  margin-bottom: 16px;
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

export const MissionTitle = styled.div<ITaskRowWrapper>`
  font-family: ${MTSSans.MEDIUM};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  font-weight: 500;
  color: #fff;
  overflow: hidden;
  width: ${props =>
    props.isInTowerInfo
      ? ReducedMissionTitleWidth.IN_TOWER_INFO
      : ReducedMissionTitleWidth.NOT_IN_TOWER_INFO}px;
  white-space: initial;
  overflow: initial;
  text-overflow: initial;
`;
export const handleTaskWrapperClick = ({
  taskDescriptionRef,
  taskType,
  vectorRef,
  isOpened,
  setIsOpened,
}: IHandleTaskWrapperClick) =>
  requestAnimationFrame(() => {
    if (
      taskDescriptionRef.current &&
      taskType !== TaskTypes.TUTORIAL_TASK &&
      vectorRef.current
    ) {
      if (isOpened) {
        taskDescriptionRef.current.style.display = 'none';
        taskDescriptionRef.current.style.opacity = '0';
        vectorRef.current.style.transform = 'rotate(0deg)';
        setIsOpened(false);
      } else {
        taskDescriptionRef.current.style.display = 'flex';
        taskDescriptionRef.current.style.opacity = '1';
        vectorRef.current.style.transform = 'rotate(180deg)';
        setIsOpened(true);
      }
    }
  });

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
interface IHandleTaskWrapperClick {
  taskDescriptionRef: React.RefObject<HTMLDivElement>;
  taskType: TaskTypes;
  vectorRef: React.RefObject<HTMLDivElement>;
  isOpened: boolean;
  setIsOpened: Function;
}
