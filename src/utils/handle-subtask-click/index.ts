import React from 'react';
import { ITask, TaskStatuses } from '../../effector/task-store/store';
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
} from '../../effector/task-store/events';
import { scrollToCurrentTower } from '../scroll-to-current-tower';
import { BuildingsService } from '../../buildings/config';
import { markerHandler } from '../marker-handler';
import { animateTaskReward } from '../animate-task-reward';
import { coughtError } from '../../effector/error-boundary-store/events';
import { extraTowerInfoModalOpen } from '../../effector/tower-info-modal-store/events';
import { MenuStore } from '../../effector/menu-store/store';
import { menuClosed } from '../../effector/menu-store/events';
import { TasksType } from '../../components/menu/menu-tasks';

export const handleSubtaskClick = async (
  taskData: ITask,
  e: React.MouseEvent
) => {
  // const missions = MissionsStore.getState();
  // for (let i = 0; i < missions.length; i++) {
  //   for (let j = 0; j < missions[i].userSubTasks.length; j++) {
  //     if (missions[i].userSubTasks[j].id === id)
  //       taskData = missions[i].userSubTasks[j];
  //   }
  // }
  const { fullSizeMode } = AppConditionStore.getState();
  const { selectedMenuItem } = MenuStore.getState();
  // const taskData = {
  //   ...tasks[tasks.findIndex(el => el.id === id)],
  // };
  // debugger;

  const towerTitle = taskData.task.content.product.slug;
  // const taskId = taskData.task.id;
  // taskData?.task.content.product.slug || TowersTypes.MAIN_TOWER;
  const { taskId: chatTaskId } = ChatStore.getState()[towerTitle];
  switch (taskData.status) {
    case TaskStatuses.CREATED:
      if (!chatTaskId) {
        if (
          taskData.task.content.taskType.slug !== TasksType.COSMETIC &&
          taskData.status === TaskStatuses.CREATED
        ) {
          await chatTaskSession({ id: taskData.id, towerTitle });
          if (!selectedMenuItem) {
            setTowerInfoContent(TowerInfoContentValues.CHAT);
          } else menuClosed();
        } else {
          await activateTask(taskData.id);
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
      markerHandler();
      return;
    case TaskStatuses.ACTIVE:
      if (taskData.task.content.taskType.slug !== TasksType.INFORMATIONAL) {
        await verifyTask(taskData.id);
        markerHandler();
      }
      break;
    case TaskStatuses.DONE:
      animateTaskReward(taskData.task.reward, e);
      await takeReward(taskData.id);
      markerHandler();
      clearChat({ towerTitle });
      break;
    case TaskStatuses.VERIFICATION:
      return markerHandler();
    case TaskStatuses.REWARDED:
    case TaskStatuses.REJECTED:
    case TaskStatuses.EXPIRED:
    // do smth
  }
};
