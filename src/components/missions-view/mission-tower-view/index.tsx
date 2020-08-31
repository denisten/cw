import React from 'react';
import styled from 'styled-components';
import { ITask } from '../../../effector/tasks-store/store';
import { Icon } from '../../../UI/icons';
import { ColumnWrapper } from '../../../UI/column-wrapper';
import { TaskLoot } from '../../../UI/task-loot';
import { TaskTimer } from '../../../UI/task-timer';
import { MissionProgressBarButton } from '../../../UI/mission-progress-bar-button';
import {
  checkTaskStatus,
  HintWrapper,
  TaskDescription,
  TaskDescriptionWrapper,
  TaskInfo,
  taskRowStyledConfig,
  Title,
  TowerTaskRow,
} from '../../tasks-view/tower-task-row';
import { calculateCompletedSubTasksQuantity } from '../mission-tower-row-view';
import { UnavailableSubtaskView } from '../unavailable-subtask-view';
import { CompletedTasksWrapper, detectSubTaskId } from '../index';
import backImg from './back-img.svg';
import { MTSSans } from '../../../fonts';

export const MissionTowerViewWrapper = styled.div`
  height: 70px;
`;

const Back = styled.div`
  display: flex;
  position: absolute;
  bottom: 70px;
  font-family: ${MTSSans.REGULAR};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.4px;
  color: #001424;
  cursor: pointer;
  img {
    margin-right: 10px;
  }
`;

const MissionInfo = styled(TaskInfo)`
  margin-bottom: 7px;
`;

const MissionTitle = styled(Title)`
  min-width: 178px;
`;

const MissionDescription = styled(TaskDescription)`
  margin-bottom: 50px;
`;

const MissionDescriptionWrapper = styled(TaskDescriptionWrapper)`
  display: flex;
  opacity: 1;
`;

export const MissionTowerView: React.FC<IMissionTowerView> = ({
  mission,
  exitCallback,
}) => {
  const completedSubTasksQuantity = calculateCompletedSubTasksQuantity(mission);

  const handleHintClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const currentSubtaskId = detectSubTaskId(mission.userSubTasks);

  const NotCompletedSubTasks =
    currentSubtaskId !== -1
      ? mission.userSubTasks
          .slice(currentSubtaskId + 1)
          .map(el => <UnavailableSubtaskView task={el} key={el.id} />)
      : React.Fragment;

  const CompletedSubTasks =
    currentSubtaskId !== -1
      ? mission.userSubTasks
          .slice(0, currentSubtaskId + 1)
          .map(el => (
            <TowerTaskRow isInTowerInfo={true} task={el} key={el.id} />
          ))
      : React.Fragment;

  return (
    <MissionTowerViewWrapper>
      <MissionInfo>
        <Icon type={mission.taskTypeSlug} />
        <MissionTitle isInTowerInfo={true}>{mission.title}</MissionTitle>
        <ColumnWrapper displayFlag={true} position="relative">
          <TaskLoot money={mission.money} energy={0} isInTowerInfo={true} />
          <TaskTimer
            expireInSeconds={mission.expireInSeconds}
            towerTitle={mission.productSlug}
          />
        </ColumnWrapper>
        <MissionProgressBarButton
          task={mission}
          completedSubTasksQuantity={completedSubTasksQuantity}
        />
      </MissionInfo>
      <MissionDescriptionWrapper>
        <MissionDescription>{mission.description}</MissionDescription>
        <CompletedTasksWrapper
          contentLength={CompletedSubTasks.length}
          displayFlag={true}
        >
          {CompletedSubTasks}
        </CompletedTasksWrapper>
        {NotCompletedSubTasks}
        <ColumnWrapper
          {...taskRowStyledConfig.columnWrapper}
          style={taskRowStyledConfig.columnWrapperAdditionalStyle}
        >
          {checkTaskStatus(mission.status) && (
            <HintWrapper onClick={handleHintClick} />
          )}
        </ColumnWrapper>
      </MissionDescriptionWrapper>
      <Back onClick={() => exitCallback()}>
        <img src={backImg} alt="back" /> Назад
      </Back>
    </MissionTowerViewWrapper>
  );
};

interface IMissionTowerView {
  mission: ITask;
  exitCallback: Function;
}
