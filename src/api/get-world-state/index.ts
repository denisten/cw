import { post } from '../requests';
import { apiRoutes } from '..';

export const getWorldState = async () => {
  await post(apiRoutes.GET_WORLD_STATE);
};
