import React from 'react';
import { ITask, TaskStatuses } from '../../effector/tasks-store/store';
import {
  AppConditionStore,
  TowerInfoContentValues,
} from '../../effector/app-condition/store';
import { ChatStore } from '../../effector/chat/store';
import { chatTaskSession, clearChat } from '../../effector/chat/events';
import { setTowerInfoContent } from '../../effector/app-condition/events';
import {
  activateTask,
  takeReward,
  verifyTask,
} from '../../effector/tasks-store/events';
import { scrollToCurrentTower } from '../scroll-to-current-tower';
import { BuildingsService } from '../../buildings/config';
import { animateTaskReward } from '../animate-task-reward';
import { coughtError } from '../../effector/error-boundary-store/events';
import { extraTowerInfoModalOpen } from '../../effector/tower-info-modal-store/events';
import { MenuStore } from '../../effector/menu-store/store';
import { menuClosed } from '../../effector/menu-store/events';
import { TasksType } from '../../components/menu/menu-tasks';
import { hideMarker } from '../../effector/towers-marker/events';
import { MarkerTypes } from '../../components/markers';

export const handleTaskClick = async (taskData: ITask, e: React.MouseEvent) => {
  const { id, productSlug: towerTitle } = taskData;

  const { fullSizeMode } = AppConditionStore.getState();
  const { selectedMenuItem } = MenuStore.getState();
  const { taskId: chatTaskId } = ChatStore.getState()[towerTitle];
  switch (taskData.status) {
    case TaskStatuses.CREATED:
      if (!chatTaskId) {
        if (
          taskData.taskTypeSlug !== TasksType.COSMETIC &&
          taskData.status === TaskStatuses.CREATED
        ) {
          await chatTaskSession({ id, towerTitle });
          if (!selectedMenuItem) {
            setTowerInfoContent(TowerInfoContentValues.CHAT);
          } else menuClosed();
        } else {
          await activateTask({ id, towerTitle });
        }
        if (fullSizeMode) {
          extraTowerInfoModalOpen(towerTitle);
        }
        scrollToCurrentTower(
          BuildingsService.getConfigForTower(towerTitle).ref
        );
      } else if (chatTaskId) {
        coughtError({
          text: 'Сначала нужно закончить начатое задание.',
        });
      }
      break;
    case TaskStatuses.ACTIVE:
      if (taskData.taskTypeSlug !== TasksType.INFORMATIONAL) {
        await verifyTask(id);
      }
      break;
    case TaskStatuses.DONE:
      animateTaskReward(taskData.money, e);
      await takeReward(id);
      hideMarker({ towerTitle, type: MarkerTypes.SUCCESS });
      clearChat({ towerTitle });
      break;
    case TaskStatuses.VERIFICATION:
    case TaskStatuses.REWARDED:
    case TaskStatuses.REJECTED:
    case TaskStatuses.EXPIRED:
    // do smth
  }
};
