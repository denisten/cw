import { MissionsDomain } from './domain';
import { fetchTasks } from './events';
import { ITask } from '../../api/get-tasks';

export enum TaskSubType {
  CHALLENGE = 'challenge',
  MISSIONS = 'missions',
  NBO = 'nbo',
  COSMETICS = 'cosmetics',
}

export enum TaskStatuses {
  DONE = 'done',
  CREATED = 'created',
  IN_PROGRESS = 'inProgress',
  EXPIRED = 'expired',
}

const initStore: ITask[] = [];

export const MissionsStore = MissionsDomain.store(initStore).on(
  fetchTasks.done,
  (state, { result: { userTasks } }) => [...userTasks]
);
