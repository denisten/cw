import { CouponTypes, PurchasStatuses } from '../../../effector/coupons/store';
import { get } from '../../requests';
import { apiRoutes } from '../..';

export const activatePromocode = async (item: CouponTypes | string) => {
  const response = await get<IActivatePromocode>(
    `${apiRoutes.STORE_PURCHASES}${item}${apiRoutes.REDEEM}`
  );
  return response.data;
};

interface IActivatePromocode {
  status: PurchasStatuses;
}
