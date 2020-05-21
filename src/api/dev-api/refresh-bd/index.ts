import { get } from '../../requests';
import { apiRoutes } from '../../index';

export const refreshBD = async () => {
  await get<IRefreshBD>(apiRoutes.REFRESH_BD);
};

interface IRefreshBD {
  data: {};
}
