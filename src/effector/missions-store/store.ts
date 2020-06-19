import { MissionsDomain } from './domain';
import {
  activateTask,
  decreaseTimer,
  fetchTasks,
  resetMissionsStore,
  takeReward,
  verifyTask,
} from './events';
import { editUserProperty } from '../user-data/events';
import { TasksType } from '../../components/tasks';
import { TowersTypes } from '../towers-progress/store';
import { TaskStatuses } from '../../api/tasks/get-tasks';

export enum TaskSubType {
  CHALLENGE = 'challenge',
  MISSIONS = 'missions',
  NBO = 'nbo',
  COSMETICS = 'cosmetics',
}

const initStore: ITask[] = [];

export const MissionsStore = MissionsDomain.store(initStore)
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
  .on(decreaseTimer, state => {
    const newState = [...state];
    state.forEach((el, id) => {
      if (el.expireInSeconds && el.expireInSeconds - 1 === 0)
        newState.splice(id, 1);
    });
    return newState.map(el => {
      return {
        ...el,
        expireInSeconds: el.expireInSeconds ? el.expireInSeconds - 1 : null,
      };
    });
  })
  .reset(resetMissionsStore);

export interface ITask {
  status: TaskStatuses;
  id: number;
  expireAt: string;
  expireInSeconds: number | null;
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
