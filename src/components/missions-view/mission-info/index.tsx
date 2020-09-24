import React from 'react';
import styled from 'styled-components';
import { ITask } from '../../../effector/tasks-store/store';
import { detectSubTaskIdx } from '../index';
import backImg from './back-img.svg';
import { MTSSans } from '../../../fonts';
import { MissionRow } from '../mission-row';
import { TaskRow } from '../../tasks-view/task-row';
import { LockedTaskRow } from '../../tasks-view/locked-task-row';

const MissionTowerViewWrapper = styled.div<IMissionTowerViewWrapper>`
  height: 70px;
`;

const Back = styled.div`
  display: flex;
  width: 113px;
  height: 35px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background: #e2e5eb;
  border-radius: 10px;
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

const SeparateTitle = styled.div`
  margin: 24px 0 10px 0;
  font-family: ${MTSSans.BOLD};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #000000;
  opacity: 0.3;
  text-align: center;
  :after {
    content: 'В очереди';
  }
`;

export const MissionInfo: React.FC<IMissionTowerView> = ({
  mission,
  exitCallback,
  isInTowerInfo,
}) => {
  const currentSubtaskIdx = detectSubTaskIdx(mission.userSubTasks);

  const NotCompletedSubTasks =
    currentSubtaskIdx !== -1
      ? mission.userSubTasks
          .slice(currentSubtaskIdx + 1)
          .map(el => (
            <LockedTaskRow key={el.id} isInTowerInfo={isInTowerInfo} />
          ))
      : React.Fragment;

  const CompletedSubTasks =
    currentSubtaskIdx !== -1
      ? mission.userSubTasks
          .slice(0, currentSubtaskIdx + 1)
          .map(el => (
            <TaskRow task={el} key={el.id} isInTowerInfo={isInTowerInfo} />
          ))
      : React.Fragment;

  return (
    <MissionTowerViewWrapper isInTowerInfo={isInTowerInfo}>
      <Back onClick={() => exitCallback()}>
        <img src={backImg} alt="back" /> Назад
      </Back>
      <MissionRow mission={mission} isInTowerInfo={isInTowerInfo} />
      {CompletedSubTasks}
      <SeparateTitle />
      {NotCompletedSubTasks}
    </MissionTowerViewWrapper>
  );
};

interface IMissionTowerView extends IMissionTowerViewWrapper {
  mission: ITask;
  exitCallback: Function;
}

interface IMissionTowerViewWrapper {
  isInTowerInfo: boolean;
}
