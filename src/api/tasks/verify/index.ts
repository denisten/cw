import { post } from '../../requests';
import { apiRoutes } from '../../index';
import { IGetTasks } from '../get-tasks';

export const verifyTaskRequest = async (id: number) => {
  const response = await post<IGetTasks>(`${apiRoutes.GET_TASKS}/${id}/verify`);
  return response.data.data;
};
