import { post } from '../../requests';
import { apiRoutes } from '../../index';

import { timerClosure } from '../../../utils/timer-closure';
import { IGetTasks } from '../../../effector/task-store/store';

export const verifyTaskRequest = async (id: number) => {
  const response = await post<IGetTasks>(`${apiRoutes.GET_TASKS}/${id}/verify`);

  response.data.data.userTasks = response.data.data.userTasks.map(el => {
    if (el.expireInSeconds) {
      el.taskTimer = timerClosure(el.expireInSeconds);
    }
    return el;
  });
  return response.data.data;
};
