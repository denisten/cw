import React from 'react';
import { MissionsStore } from '../../effector/missions-store/store';
import {
  AppCondition,
  TowerInfoContentValues,
} from '../../effector/app-condition/store';
import { ChatStore } from '../../effector/chat/store';
import { TaskStatuses } from '../../api/tasks/get-tasks';
import { TasksType } from '../../components/tasks';
import { chatTaskSession, clearChat } from '../../effector/chat/events';
import {
  menuClosed,
  setTowerInfoContent,
  extraTowerInfoModalOpen,
} from '../../effector/app-condition/events';
import {
  activateTask,
  fetchTasks,
  takeReward,
  verifyTask,
} from '../../effector/missions-store/events';
import { scrollToCurrentTower } from '../scroll-to-current-tower';
import { BuildingsService } from '../../buildings/config';
import { markerHandler } from '../marker-handler';
import { animateTaskReward } from '../animate-task-reward';

export const handleTaskClick = async (id: number, e: React.MouseEvent) => {
  const tasks = MissionsStore.getState();
  const { selectedMenuItem, fullSizeMode } = AppCondition.getState();
  const taskData = {
    id: tasks.findIndex(el => el.id === id),
    ...tasks[tasks.findIndex(el => el.id === id)],
  };
  const towerTitle = taskData.task.content.product.slug;
  const { taskId: chatTaskId } = ChatStore.getState()[towerTitle];
  switch (taskData.status) {
    case TaskStatuses.CREATED:
      if (!chatTaskId) {
        if (
          taskData.task.content.taskType.slug !== TasksType.COSMETIC &&
          taskData.status === TaskStatuses.CREATED
        ) {
          await chatTaskSession({ id, towerTitle });
          if (!selectedMenuItem) {
            setTowerInfoContent(TowerInfoContentValues.CHAT);
          } else menuClosed();
        } else {
          await activateTask(id);
        }
        if (fullSizeMode) {
          extraTowerInfoModalOpen(towerTitle);
        }
        scrollToCurrentTower(
          BuildingsService.getConfigForTower(towerTitle).ref
        );
      } else if (chatTaskId) {
        alert('нельзя');
      }
      markerHandler();
      return;
    case TaskStatuses.ACTIVE:
      await verifyTask(id);
      markerHandler();
      break;
    case TaskStatuses.DONE:
      animateTaskReward(taskData.task.reward, e);
      await takeReward(id);
      markerHandler();
      clearChat({ towerTitle });
      break;
    case TaskStatuses.VERIFICATION:
      markerHandler();
      return fetchTasks('');
    case TaskStatuses.REWARDED:
    case TaskStatuses.REJECTED:
    case TaskStatuses.EXPIRED:
    // do smth
  }
};
