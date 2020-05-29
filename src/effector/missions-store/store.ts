import { MissionsDomain } from './domain';
import { activateTask, fetchTasks, finishTask, verifyTask } from './events';
import { handleTaskStatusChange } from '../../utils/task-status-change';
import { editUserProperty } from '../user-data/events';

export enum TaskSubType {
  CHALLENGE = 'challenge',
  MISSIONS = 'missions',
  NBO = 'nbo',
  COSMETICS = 'cosmetics',
}

export enum TaskStatuses {
  CREATED = 'created',
  ACTIVE = 'active',
  VERIFICATION = 'verification',
  DONE = 'done',
  REJECTED = 'reject',
  REWARDED = 'rewarded',
  EXPIRED = 'expired',
}

const initStore: ITask[] = [];

export const MissionsStore = MissionsDomain.store(initStore)
  .on(fetchTasks.done, (state, { result: { userTasks } }) => [...userTasks])
  .on(activateTask, (state, payload) =>
    handleTaskStatusChange(state, payload, TaskStatuses.ACTIVE)
  )
  .on(verifyTask, (state, payload) =>
    handleTaskStatusChange(state, payload, TaskStatuses.VERIFICATION)
  )
  .on(finishTask, (state, payload) => {
    const newState = [...state];
    const currentEl = newState.findIndex(el => el.id === payload);
    const deletedTask = newState.splice(currentEl, 1);
    editUserProperty({
      money: deletedTask[0].task.reward,
      energy: deletedTask[0].task.energy,
    });
    return newState;
  });

export interface ITask {
  status: TaskStatuses;
  id: number;
  task: {
    id: number;
    parentId: number;
    content: {
      id: number;
      taskType: {
        id: number;
        slug: string;
        name: string;
      };
      product: {
        id: number;
        name: string;
        slug: string;
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
