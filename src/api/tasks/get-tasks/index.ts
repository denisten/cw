import { get } from '../../requests';
import { apiRoutes } from '../../index';
import { ITask } from '../../../effector/missions-store/store';
import { setTaskId } from '../../../effector/chat-messages/events';
import { timerClosure } from '../../../utils/timer-closure';

export enum TaskStatuses {
  CREATED = 'created',
  ACTIVE = 'active',
  VERIFICATION = 'verification',
  DONE = 'done',
  REJECTED = 'rejected',
  REWARDED = 'rewarded',
  EXPIRED = 'expired',
}

export const getTasks = async () => {
  const response = await get<IGetTasks>(apiRoutes.GET_TASKS);
  response.data.data.userTasks = response.data.data.userTasks.map(el => {
    if (el.status !== TaskStatuses.CREATED) {
      setTaskId({ towerTitle: el.task.content.product.slug, taskId: el.id });
    }
    if (el.expireInSeconds) {
      el.taskTimer = timerClosure(el.expireInSeconds);
    }
    return el;
  });
  return response.data.data;
};

export interface IGetTasks {
  data: {
    userTasks: ITask[];
    total: number;
  };
}
