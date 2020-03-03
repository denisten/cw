import { get } from '../requests';
import { apiRoutes } from '..';

export const getUrl = async () => {
  const response = await get(apiRoutes.GET_URL);
  console.log(response);
  const { url } = response.data;
  return url;
};
