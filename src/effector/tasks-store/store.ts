import { MissionsDomain } from './domain';
import {
  getResult,
  resetMissionsStore,
  saveTask,
  setCurrentTaskStatus,
  updateTaskStatus,
} from './events';
import { TowersTypes } from '../towers-progress/store';
import { chatTaskSession } from '../chat/events';
import { setMarker } from '../towers-marker/events';
import { MarkerTypes } from '../../components/markers';
import { TaskTypes } from '../../app';

export enum TaskStatuses {
  CREATED = 'created',
  ACTIVE = 'active',
  VERIFICATION = 'verification',
  DONE = 'done',
  REJECTED = 'rejected',
  REWARDED = 'rewarded',
  EXPIRED = 'expired',
  PROGRESS_COMMITTED = 'progress-committed',
  NOT_AVAILABLE = 'not-available',
}

const initStore: ITask[] = [];

export const TasksStore = MissionsDomain.store(initStore)
  .on(updateTaskStatus, (state, { taskId, status, isSubtask }) => {
    if (isSubtask) return state;
    const taskIdx = state.findIndex(el => el.id === taskId);
    const task = state[taskIdx];
    task.status = status;
    return [...state.slice(0, taskIdx), task, ...state.slice(taskIdx + 1)];
  })
  .on(saveTask, (state, payload) => payload)
  .on(setCurrentTaskStatus, (state, { taskId, status, isSubTask }) => {
    if (isSubTask) return state;
    const currentTaskIndex = state.findIndex(el => el.id === taskId);
    return [
      ...state.slice(0, currentTaskIndex),
      { ...state[currentTaskIndex], status },
      ...state.slice(currentTaskIndex + 1),
    ];
  })
  .on(chatTaskSession.doneData, (state, { taskId, data }) => {
    const taskIdx = state.findIndex(el => el.id === taskId);
    if (taskIdx === -1) return state;
    return [
      ...state.slice(0, taskIdx),
      {
        ...state[taskIdx],
        status: !data.ended ? TaskStatuses.ACTIVE : state[taskIdx].status,
      },
      ...state.slice(taskIdx + 1),
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

const detectTaskStatus = (taskStatus: TaskStatuses) => {
  switch (taskStatus) {
    case TaskStatuses.ACTIVE:
      return MarkerTypes.ACTIVE_TASK;
    case TaskStatuses.DONE:
      return MarkerTypes.SUCCESS;
    case TaskStatuses.CREATED:
    default:
      return MarkerTypes.TASK;
  }
};

saveTask.watch(el =>
  el.map(el => {
    setMarker({
      towerTitle: el.productSlug,
      type: detectTaskStatus(el.status),
    });
  })
);

export interface ITask {
  id: number;
  status: TaskStatuses;
  expireAt: string;
  expireInSeconds: number | null;
  localExpireInSeconds?: () => number;
  taskTypeSlug: TaskTypes;
  productSlug: TowersTypes;
  title: string;
  legend: string;
  description: string;
  order: number | null;
  energy: number;
  money: number;
  userSubTasks: ITask[];
}

export interface IGetTasks {
  data: ITask[];
}
