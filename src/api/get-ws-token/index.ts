import { apiRoutes } from '..';
import { post } from '../requests';

export const getWsToken = async () => {
  const response = await post<IGetWsToken>(apiRoutes.GET_WS_TOKEN);
  return response.data.data.token;
};

interface IGetWsToken {
  data: {
    token: string;
  };
}
