import { post } from '../../requests';
import { apiRoutes } from '../../index';

export const rewardRequest = async (id: number) => {
  await post(`${apiRoutes.GET_TASKS}/${id}/reward`);
};
