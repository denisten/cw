import React from 'react';
import { ITask, TaskStatuses } from '../../../effector/tasks-store/store';
import styled from 'styled-components';
import { TaskLoot, TaskLootLetterColors } from '../../../UI/task-loot';
import { MissionTitle } from '../../missions-view/mission-row';
import { handleTaskClick } from '../../../utils/handle-task-click';
import { useStore } from 'effector-react';
import { SettingsStore } from '../../../effector/settings/store';
import { useAudio } from '../../../hooks/use-sound';
import takeRewardSound from '../../../sound/take-reward.mp3';
import activeTask from '../../../sound/active-task.mp3';
import { MissionWrapperWidth } from '../../missions-view/reduced-mission-row';
import { TaskButton } from '../../../UI/task-button';
import { ButtonWrapper } from '../task-row';
import { checkTaskStatus } from '../../../UI/mission-progress-bar-button';
import { Hint } from '../../hint';
import { openCouponModalWindow } from '../../../effector/coupon-MW-store/events';

const TaskRowWrapper = styled.div<ITaskRowWrapper>`
  width: ${props =>
    props.isInTowerInfo
      ? MissionWrapperWidth.IN_TOWER_INFO
      : MissionWrapperWidth.NOT_IN_TOWER_INFO}px;
  min-height: 62px;
  background: linear-gradient(90.56deg, #2f5ccf 0%, #6412cc 99.76%), #ffffff;
  border: 1px solid #ebecef;
  border-radius: 15px;
  padding: 9px 18px 8px 28px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;
enum TaskRowTitleWidth {
  IN_TOWER_INFO = 200,
  NOT_IN_TOWER_INFO = 400,
}
const TaskRowTitle = styled(MissionTitle)<ITaskRowWrapper>`
  width: ${props =>
    props.isInTowerInfo
      ? TaskRowTitleWidth.IN_TOWER_INFO
      : TaskRowTitleWidth.NOT_IN_TOWER_INFO}px;
  margin-right: 5px;
  max-width: initial;
  min-width: initial;
`;

export const SubTaskRow: React.FC<ITaskRow> = ({ task, isInTowerInfo }) => {
  const {
    sound: { volume },
  } = useStore(SettingsStore);
  const { play: playRewardSound } = useAudio(takeRewardSound, false);
  const { play: playActiveTask } = useAudio(activeTask, false);
  const hintCallback = () =>
    openCouponModalWindow({ towerTitle: task.productSlug, taskId: task.id });
  const taskButtonHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    task.status === TaskStatuses.DONE && volume && playRewardSound();
    task.status === TaskStatuses.CREATED && volume && playActiveTask();
    await handleTaskClick({ task, e, taskType: task.taskTypeSlug });
  };
  return (
    <TaskRowWrapper isInTowerInfo={isInTowerInfo}>
      <TaskRowTitle isInTowerInfo={isInTowerInfo}>{task.title}</TaskRowTitle>
      <TaskLoot
        energy={task.energy}
        money={task.money}
        isInTowerInfo={true}
        color={TaskLootLetterColors.WHITE}
      />
      <ButtonWrapper>
        <TaskButton
          className={task.status}
          expireInSeconds={task.expireInSeconds}
          onClick={taskButtonHandler}
        />
        {checkTaskStatus(task.status) && <Hint callback={hintCallback} />}
      </ButtonWrapper>
    </TaskRowWrapper>
  );
};

export interface ITaskRow extends ITaskRowWrapper {
  task: ITask;
}

interface ITaskRowWrapper {
  isInTowerInfo: boolean;
}
