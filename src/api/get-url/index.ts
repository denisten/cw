import { get } from '../requests';
import { apiRoutes } from '..';

export const getUrl = async () => {
  const response = await get<IGetUrl>(apiRoutes.GET_URL);
  return response.data.data.url;
};

interface IGetUrl {
  data: {
    url: string;
  };
}
