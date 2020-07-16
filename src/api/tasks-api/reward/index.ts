import { post } from '../../requests';
import { apiRoutes } from '../../index';
import { IGetTasks } from '../get-tasks';

export const rewardRequest = async (id: number) => {
  const response = await post<IGetTasks>(`${apiRoutes.GET_TASKS}/${id}/reward`);
  return response.data.data;
};
