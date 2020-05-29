import { post } from '../../requests';
import { apiRoutes } from '../../index';

export const verifyTaskRequest = async (id: number) => {
  await post(`${apiRoutes.GET_TASKS}/${id}/verify`);
};
