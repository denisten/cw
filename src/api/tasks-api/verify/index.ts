import { post } from '../../requests';
import { apiRoutes } from '../../index';

import { timerClosure } from '../../../utils/timer-closure';
import { IGetTasks } from '../../../effector/tasks-store/store';

export const verifyTaskRequest = async (id: number) => {
  const response = await post<IGetTasks>(`${apiRoutes.GET_TASKS}/${id}/verify`);

  response.data.data = response.data.data.map(el => {
    if (el.expireInSeconds) {
      el.taskTimer = timerClosure(el.expireInSeconds);
    }
    return el;
  });
  return response.data.data;
};
