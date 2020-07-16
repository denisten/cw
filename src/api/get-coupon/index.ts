import { post } from '../requests';
import { apiRoutes } from '..';

export const getCoupon = () => post(apiRoutes.BUY_COUPON);
