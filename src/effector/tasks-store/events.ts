import { MissionsDomain } from './domain';
import {
  getTaskResultRequest,
  IGetTaskResultRequest,
} from '../../api/tasks-api/result';
import { ITask, TaskStatuses } from './store';
import { rewardRequest } from '../../api/tasks-api/reward';
import { TaskTypes } from '../../app';

export const saveTask = MissionsDomain.event<ITask[]>();
export const updateTaskStatus = MissionsDomain.event<IUpdateTaskStatus>();
interface IUpdateTaskStatus {
  taskId: number;
  status: TaskStatuses;
  isSubtask: boolean;
}
export const getTaskReward = MissionsDomain.effect(
  'get reward for task complete',
  {
    handler: async ({ id, taskType }: IGetTaskReward) => {
      await rewardRequest(id);
      return { id, taskType };
    },
  }
);

export const getResult = MissionsDomain.effect({
  handler: async (id: number): Promise<IGetResult> => {
    const response = await getTaskResultRequest(id);
    return { ...response, id };
  },
});

export const setCurrentTaskStatus = MissionsDomain.event<
  ISetCurrentTaskStatus
>();

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
