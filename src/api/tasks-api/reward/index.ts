import { post } from '../../requests';
import { apiRoutes } from '../../index';
import { IGetTasks } from '../../../effector/missions-store/store';

export const rewardRequest = async (id: number) => {
  const response = await post<IGetTasks>(`${apiRoutes.GET_TASKS}/${id}/reward`);
  return response.data.data;
};
