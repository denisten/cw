import React, { useRef, useState } from 'react';
import { TaskInfo, TaskWrapper, Title } from '../../tasks-view/tower-task-row';
import { ITask, TaskStatuses } from '../../../effector/tasks-store/store';
import { TaskLoot } from '../../../UI/task-loot';
import { couponModalConfig } from '../../tower-info/tower-info-chat';
import { ModalWindow } from '../../modal-window';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { handleTaskWrapperClick } from '../../tasks-view/menu-task-row';
import { TaskTimer } from '../../../UI/task-timer';
import { Icon } from '../../../UI/icons';
import styled from 'styled-components';
import { MissionProgressBarButton } from '../../../UI/mission-progress-bar-button';

const MissionWrapper = styled(TaskWrapper)`
  border: 2px solid #8ec811;
  height: 72px;
  overflow: hidden;
  min-height: 72px;
  padding: 16px 32px 16px 16px;
`;

const MissionInfo = styled(TaskInfo)``;

const MissionTitle = styled(Title)`
  min-width: 205px;
`;

export const calculateCompletedSubTasksQuantity = (mission: ITask) => {
  const wantedTaskStatusesSet = new Set([TaskStatuses.REWARDED]);
  return mission.userSubTasks.filter(el => wantedTaskStatusesSet.has(el.status))
    .length;
};

const styledConfig = {
  missionProgressBarButton: {
    position: 'relative',
    left: '-30px',
  } as React.CSSProperties,
};

export const MissionTowerRowView: React.FC<IMissionTowerRowView> = ({
  isInTowerInfo,
  mission,
  callback,
}) => {
  const { taskTypeSlug: taskType, productSlug: towerTitle } = mission;

  const [isOpened, setIsOpened] = useState(false);
  const taskWrapperRef = useRef<HTMLDivElement>(null);
  const taskDescriptionRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLImageElement>(null);

  const [isCouponModalWindowOpen, setIsCouponModalWindowOpen] = useState(false);

  const completedSubTasksQuantity = calculateCompletedSubTasksQuantity(mission);

  const handleClick = () => {
    callback(mission);
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
      ref={taskWrapperRef}
      onClick={handleClick}
      isInTowerInfo={isInTowerInfo}
    >
      <ModalWindow
        {...couponModalConfig}
        displayFlag={isCouponModalWindowOpen}
        cancelHandler={() => setIsCouponModalWindowOpen(false)}
        id={mission.id}
        towerTitle={towerTitle}
      />
      <MissionInfo>
        <Icon type={taskType} />
        <MissionTitle isInTowerInfo={isInTowerInfo}>
          {mission.title}
        </MissionTitle>
        <ColumnWrapper displayFlag={true} position="relative">
          <TaskLoot
            money={mission.money}
            energy={0}
            isInTowerInfo={isInTowerInfo}
          />
          <TaskTimer
            expireInSeconds={mission.localExpireInSeconds}
            towerTitle={mission.productSlug}
          />
        </ColumnWrapper>
        <MissionProgressBarButton
          style={styledConfig.missionProgressBarButton}
          task={mission}
          completedSubTasksQuantity={completedSubTasksQuantity}
        />
      </MissionInfo>
    </MissionWrapper>
  );
};

interface IMissionTowerRowView {
  isInTowerInfo: boolean;
  mission: ITask;
  callback: Function;
}
