import { get } from '../requests';
import { apiRoutes } from '..';

export const getUrl = async () => {
  const response = await get<IGetUrl>(apiRoutes.GET_URL);
  return response.data.url;
};

interface IGetUrl {
  url: string;
}
