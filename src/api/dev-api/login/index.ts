import { get } from '../../requests';
import { apiRoutes } from '../../index';

export const devLoginRequest = async (phoneNumber: string) => {
  await get(`${apiRoutes.DEV_LOGIN}/${phoneNumber}`);
};
