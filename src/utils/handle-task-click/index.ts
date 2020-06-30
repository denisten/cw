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
import { hideMarker, setMarker } from '../../effector/towers-marker/events';
import { TypeOfMarkers } from '../../components/markers';
import {
  menuClosed,
  setTowerInfoContent,
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
  const { selectedMenuItem } = AppCondition.getState();
  const currentMissionIdx = state.findIndex(el => el.id === id);
  const currentMission = state[currentMissionIdx];
  const currentMissionType = currentMission.task.content.taskType.slug;
  const currentTowerTitle = currentMission.task.content.product.slug;
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
          setMarker({
            towerTitle: currentTowerTitle,
            type: TypeOfMarkers.ACTIVE_TASK,
          });
          if (!selectedMenuItem) {
            setTowerInfoContent(TowerInfoContentValues.CHAT);
          } else menuClosed();
        } else {
          await activateTask(id);
        }
        scrollToCurrentTower(
          BuildingsService.getConfigForTower(productTitle).ref
        );
      } else if (taskId) {
        alert('нельзя');
      }
      return;
    case TaskStatuses.ACTIVE:
      await verifyTask(id);
      markerHandler(status, productTitle);
      break;
    case TaskStatuses.DONE:
      animateTaskReward(currentMission.task.reward, e);
      await takeReward(id);
      markerHandler(status, productTitle);
      clearChat({ towerTitle: productTitle });
      break;
    case TaskStatuses.VERIFICATION:
      hideMarker({
        towerTitle: currentTowerTitle,
        type: TypeOfMarkers.TAKE_REWARD,
      });
      return fetchTasks('');
    case TaskStatuses.REWARDED:
    case TaskStatuses.REJECTED:
    case TaskStatuses.EXPIRED:
    // do smth
  }
};
