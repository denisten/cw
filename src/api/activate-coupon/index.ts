import { get } from '../requests';
import { apiRoutes } from '..';
import { CouponTypes } from '../../effector/coupons/store';

export const activateCoupon = async (item: CouponTypes, entityId: number) => {
  const response = await get<IActivateCoupon>(
    `${apiRoutes.STORE_PURCHASES}${item}${apiRoutes.REDEEM}?context_id=${entityId}`
  );
  return response.data;
};

interface IActivateCoupon {
  data: { msg: string };
  state: string;
}
