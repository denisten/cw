import { MissionsDomain } from './domain';
import {
  activateTask,
  fetchTasks,
  getResult,
  resetMissionsStore,
  setCurrentTaskStatus,
  takeReward,
  verifyTask,
} from './events';
import { editUserProperty } from '../user-data/events';
import { TasksType } from '../../components/tasks';
import { TowersTypes } from '../towers-progress/store';
import { TaskStatuses } from '../../api/tasks/get-tasks';
import { chatTaskSession } from '../chat/events';

const initStore: ITask[] = [];

export const TasksStore = MissionsDomain.store(initStore)
  .on(fetchTasks.doneData, (state, { userTasks }) => userTasks)
  .on(activateTask.doneData, (state, { userTasks }) => userTasks)
  .on(verifyTask.doneData, (state, { userTasks }) => userTasks)
  .on(takeReward.doneData, (state, { userTasks, id }) => {
    const currentEl = state.findIndex(el => el.id === id);
    const deletedTask = state.splice(currentEl, 1);
    editUserProperty({
      money: deletedTask[0].task.reward,
      energy: deletedTask[0].task.energy,
    });
    return userTasks;
  })

  .on(setCurrentTaskStatus, (state, { taskId, status }) => {
    const currentTaskIndex = state.findIndex(el => el.id === taskId);
    return [
      ...state.slice(0, currentTaskIndex),
      { ...state[currentTaskIndex], status },
      ...state.slice(currentTaskIndex + 1),
    ];
  })
  .on(chatTaskSession.doneData, (state, { taskId }) => {
    const currentTaskIndex = state.findIndex(el => el.id === taskId);
    return [
      ...state.slice(0, currentTaskIndex),
      {
        ...state[currentTaskIndex],
        status: TaskStatuses.ACTIVE,
      },
      ...state.slice(currentTaskIndex + 1),
    ];
  })
  .on(getResult.doneData, (state, payload) => {
    const { success } = payload.quizResult;
    const currentTaskIndex = state.findIndex(el => el.id === payload.id);
    let editedTask;
    if (success) {
      editedTask = {
        ...state[currentTaskIndex],
        status: TaskStatuses.DONE,
      };
    } else {
      editedTask = {
        ...state[currentTaskIndex],
        status: TaskStatuses.REJECTED,
      };
    }
    return [
      ...state.slice(0, currentTaskIndex),
      editedTask,
      ...state.slice(currentTaskIndex + 1),
    ];
  })
  .reset(resetMissionsStore);

export interface ITask {
  status: TaskStatuses;
  id: number;
  expireAt: string;
  expireInSeconds: number | null;
  taskTimer?: () => number;
  task: {
    id: number;
    parentId: number;
    content: {
      id: number;
      taskType: {
        id: number;
        slug: TasksType;
        name: string;
      };
      product: {
        id: number;
        name: string;
        slug: TowersTypes;
        description: string;
      };
      logo: {
        id: number;
        content: string;
      };
      name: string;
      legend: string;
      description: string;
    };
    priorityNumber: number;
    energy: number;
    reward: number;
    availabilityTime: number;
    executionTime: number;
    betweenTasksTime: number;
    chat: string;
  };
}
