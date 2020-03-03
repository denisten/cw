import { get } from '../requests';
import { apiRoutes } from '..';

export const getUrl = async () => {
  const response = await get(apiRoutes.GET_URL);
  const { url } = response.data;
  return url;
};
