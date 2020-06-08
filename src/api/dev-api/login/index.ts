import { get } from '../../requests';

export const devLoginRequest = async (phoneNumber: string) => {
  // await get(apiRoutes.DEV_LOGIN + phoneNumber);
  await get('/api/dev/login/' + phoneNumber);
};
