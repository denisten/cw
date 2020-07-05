import React from 'react';
import { MissionsStore } from '../../effector/missions-store/store';
import {
  AppCondition,
  TowerInfoContentValues,
} from '../../effector/app-condition/store';
import { TaskMessagesStore } from '../../effector/chat-messages/store';
import { TaskStatuses } from '../../api/tasks/get-tasks';
import { TasksType } from '../../components/tasks';
import {
  chatTaskSession,
  clearChat,
} from '../../effector/chat-messages/events';
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
  const state = MissionsStore.getState();
  const { selectedMenuItem, fullSizeMode } = AppCondition.getState();
  const currentMissionIdx = state.findIndex(el => el.id === id);
  const currentMission = state[currentMissionIdx];
  const currentMissionType = currentMission.task.content.taskType.slug;
  const productTitle = state[currentMissionIdx].task.content.product.slug;
  const { status } = state[currentMissionIdx];
  const { taskId } = TaskMessagesStore.getState()[productTitle];
  switch (status) {
    case TaskStatuses.CREATED:
      if (!taskId) {
        if (
          currentMissionType !== TasksType.COSMETIC &&
          state[currentMissionIdx].status === TaskStatuses.CREATED
        ) {
          await chatTaskSession({ id, towerTitle: productTitle });
          if (!selectedMenuItem) {
            setTowerInfoContent(TowerInfoContentValues.CHAT);
          } else menuClosed();
        } else {
          await activateTask(id);
        }
        if (fullSizeMode) {
          extraTowerInfoModalOpen(productTitle);
        } else {
          scrollToCurrentTower(
            BuildingsService.getConfigForTower(productTitle).ref
          );
        }
      } else if (taskId) {
        alert('нельзя');
      }
      markerHandler();
      return;
    case TaskStatuses.ACTIVE:
      await verifyTask(id);
      markerHandler();
      break;
    case TaskStatuses.DONE:
      animateTaskReward(currentMission.task.reward, e);
      await takeReward(id);
      markerHandler();
      clearChat({ towerTitle: productTitle });
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
