import { apiRoutes } from '..';
import { get } from '../requests';

export const logoutRequest = async () => {
  const response = await get<ILogout>(apiRoutes.LOGOUT);
  return response.data.data.url;
};

interface ILogout {
  data: { url: string };
}
