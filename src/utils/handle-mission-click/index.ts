import React from 'react';
import { ITask, TaskStatuses } from '../../effector/tasks-store/store';
import { ChatStore } from '../../effector/chat/store';
import { MenuStore } from '../../effector/menu-store/store';
import { editUserProperty } from '../../effector/user-data/events';
import { handleRewardTask, handleStartTask } from '../handle-task-click';
import { TaskTypes } from '../../app';

export const updateUserBalance = (money: number, energy: number) => {
  editUserProperty({
    money,
    energy,
  });
};

export const handleMissionClick = async ({
  mission,
  e,
}: IHandleMissionClick) => {
  const { id, productSlug: towerTitle, money } = mission;
  const { selectedMenuItem } = MenuStore.getState();
  const { taskId: chatTaskId } = ChatStore.getState()[towerTitle];
  switch (mission.status) {
    case TaskStatuses.CREATED:
      await handleStartTask({
        chatTaskId,
        id,
        towerTitle,
        selectedMenuItem,
      });
      break;
    case TaskStatuses.ACTIVE:
    case TaskStatuses.DONE:
      if (
        mission.userSubTasks[mission.userSubTasks.length - 1].status ===
        TaskStatuses.REWARDED
      )
        await handleRewardTask({
          e,
          id,
          taskType: TaskTypes.MISSION,
          money,
          towerTitle,
        });
      break;
    default:
      return;
  }
};

interface IHandleMissionClick {
  mission: ITask;
  e: React.MouseEvent;
}
