import { get } from '../../requests';
import { apiRoutes } from '../../index';

export const devGetCoupons = async () => {
  await get(apiRoutes.DEV_GET_COUPONS);
};
