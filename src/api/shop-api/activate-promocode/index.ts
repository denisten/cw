import {
  CouponTypes,
  PurchasStatuses,
  PromocodeTypes,
} from '../../../effector/coupons/store';
import { get } from '../../requests';
import { apiRoutes } from '../..';

export const activatePromocode = async (item: CouponTypes | PromocodeTypes) => {
  const response = await get<IActivatePromocode>(
    `${apiRoutes.STORE_PURCHASES}${item}${apiRoutes.REDEEM}`
  );
  return response.data;
};

interface IActivatePromocode {
  status: PurchasStatuses;
}
