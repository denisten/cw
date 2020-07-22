import { MissionsDomain } from './domain';
import { activateTaskRequest } from '../../api/tasks-api/activate';
import { verifyTaskRequest } from '../../api/tasks-api/verify';
import { rewardRequest } from '../../api/tasks-api/reward';
import {
  getTaskResultRequest,
  IGetTaskResultRequest,
} from '../../api/tasks-api/result';
import { ITask, TaskStatuses } from './store';

export const fetchTasks = MissionsDomain.event<{ userTasks: ITask[] }>();

export const activateTask = MissionsDomain.effect(
  'activate current task and fetch new list',
  {
    handler: async (id: number) => {
      return await activateTaskRequest(id);
    },
  }
);

export const verifyTask = MissionsDomain.effect('verify current task', {
  handler: async (id: number) => {
    return await verifyTaskRequest(id);
  },
});
export const takeReward = MissionsDomain.effect({
  handler: async (id: number) => {
    const response = await rewardRequest(id);
    return { ...response, id };
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
