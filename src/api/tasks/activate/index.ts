import { post } from '../../requests';
import { apiRoutes } from '../../index';

export const activateTaskRequest = async (id: number) => {
  await post(`${apiRoutes.GET_TASKS}/${id}/activate`);
};
