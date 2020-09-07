import React from 'react';
import { ITask, TaskStatuses } from '../../effector/tasks-store/store';
import {
  AppConditionStore,
  TowerInfoContentValues,
} from '../../effector/app-condition/store';
import { ChatStore } from '../../effector/chat/store';
import { chatTaskSession, clearChat } from '../../effector/chat/events';
import { setTowerInfoContent } from '../../effector/app-condition/events';
import { getTaskReward } from '../../effector/tasks-store/events';
import { scrollToCurrentTower } from '../scroll-to-current-tower';
import { BuildingsService } from '../../buildings/config';
import { animateTaskReward } from '../animate-task-reward';
import { coughtError } from '../../effector/error-boundary-store/events';
import { extraTowerInfoModalOpen } from '../../effector/tower-info-modal-store/events';
import { MenuStore } from '../../effector/menu-store/store';
import { menuClosed } from '../../effector/menu-store/events';
import { hideMarker } from '../../effector/towers-marker/events';
import { MarkerTypes } from '../../components/markers';
import { TaskTypes } from '../../app';
import { TowersTypes } from '../../effector/towers-progress/store';
import { MenuItems } from '../../UI/menu-paragraph';
import { updateUserBalance } from '../handle-mission-click';

export const handleStartTask = async ({
  chatTaskId,
  id,
  towerTitle,
  selectedMenuItem,
  fullSizeMode,
}: IHandleStartTask) => {
  if (!chatTaskId) {
    await chatTaskSession({ id, towerTitle });
    selectedMenuItem && menuClosed();
    setTowerInfoContent(TowerInfoContentValues.CHAT);
    fullSizeMode && extraTowerInfoModalOpen(towerTitle);
    scrollToCurrentTower(BuildingsService.getConfigForTower(towerTitle).ref);
  } else
    coughtError({
      text: 'Сначала нужно закончить начатое задание.',
    });
};

export const handleRewardTask = async ({
  e,
  id,
  taskType,
  money,
  energy,
  towerTitle,
}: IHandleRewardTask) => {
  animateTaskReward(money, e);
  await getTaskReward({ id, taskType });
  updateUserBalance(money, energy);
  hideMarker({ towerTitle, type: MarkerTypes.SUCCESS });
  clearChat({ towerTitle });
};

export const handleTaskClick = async ({
  task,
  e,
  taskType,
}: IHandleTaskClick) => {
  const { id, productSlug: towerTitle, money, energy } = task;
  const { fullSizeMode } = AppConditionStore.getState();
  const { selectedMenuItem } = MenuStore.getState();
  const { taskId: chatTaskId } = ChatStore.getState()[towerTitle];
  switch (task.status) {
    case TaskStatuses.CREATED:
      await handleStartTask({
        chatTaskId,
        id,
        towerTitle,
        selectedMenuItem,
        fullSizeMode,
      });
      break;
    case TaskStatuses.ACTIVE:
      setTowerInfoContent(TowerInfoContentValues.CHAT);
      break;
    case TaskStatuses.DONE:
      await handleRewardTask({ e, id, taskType, money, energy, towerTitle });
      break;
    default:
      return;
  }
};

interface IHandleTaskClick {
  task: ITask;
  e: React.MouseEvent;
  taskType: TaskTypes;
}

interface IHandleRewardTask {
  e: React.MouseEvent;
  id: number;
  taskType: TaskTypes;
  money: number;
  energy: number;
  towerTitle: TowersTypes;
}

interface IHandleStartTask {
  chatTaskId: number;
  id: number;
  towerTitle: TowersTypes;
  selectedMenuItem: MenuItems | null;
  fullSizeMode: boolean;
}
