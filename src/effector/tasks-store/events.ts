import { MissionsDomain } from './domain';
import { activateTaskRequest } from '../../api/tasks-api/activate';
import { verifyTaskRequest } from '../../api/tasks-api/verify';
import {
  getTaskResultRequest,
  IGetTaskResultRequest,
} from '../../api/tasks-api/result';
import { ITask, TaskStatuses } from './store';
import { rewardRequest } from '../../api/tasks-api/reward';
import { TaskTypes } from '../../app';

export const saveTask = MissionsDomain.event<ITask[]>();

export const activateTask = MissionsDomain.effect(
  'activate current task and fetch new list',
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler: async ({ id, towerTitle }) => {
      return await activateTaskRequest(id);
    },
  }
);
export const getTaskReward = MissionsDomain.effect(
  'get reward for task complete',
  {
    handler: async ({ id, taskType }: IGetTaskReward) => {
      await rewardRequest(id);
      return { id, taskType };
    },
  }
);

export const verifyTask = MissionsDomain.effect('verify current task', {
  handler: async (id: number) => {
    return await verifyTaskRequest(id);
  },
});

export const getResult = MissionsDomain.effect({
  handler: async (id: number): Promise<IGetResult> => {
    const response = await getTaskResultRequest(id);
    return { ...response, id: id };
  },
});

export const setCurrentTaskStatus = MissionsDomain.event<
  ISetCurrentTaskStatus
>();

export const finishTask = MissionsDomain.event<number>(
  'take reward and delete from store'
);

export const resetMissionsStore = MissionsDomain.event();

interface ISetCurrentTaskStatus {
  taskId: number;
  status: TaskStatuses;
}

interface IGetResult extends IGetTaskResultRequest {
  id: number;
}

interface IGetTaskReward {
  id: number;
  taskType: TaskTypes;
}
