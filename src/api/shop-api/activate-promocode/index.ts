import { CouponTypes, PurchasStatuses } from '../../../effector/coupons/store';
import { get } from '../../requests';
import { apiRoutes } from '../..';

export const activatePromoCode = async (item: CouponTypes | string) => {
  const response = await get<IActivatePromoCode>(
    `${apiRoutes.STORE_PURCHASES}${item}${apiRoutes.REDEEM}`
  );
  return response.data;
};

interface IActivatePromoCode {
  status: PurchasStatuses;
}
