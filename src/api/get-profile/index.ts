import { get } from '../requests';
import { apiRoutes } from '..';

export const getProfile = async () => {
  const response = await get(apiRoutes.GET_PROFILE);
  return response.data;
};
