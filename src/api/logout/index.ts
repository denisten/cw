import { apiRoutes } from '..';
import { post } from '../requests';

export const logoutRequest = async () => {
  await post<ILogout>(apiRoutes.LOGOUT);
};

interface ILogout {
  url: string;
}
