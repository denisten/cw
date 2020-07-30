import { get } from '../requests';
import { apiRoutes } from '..';
import { ShopItemsType } from '../../effector/coupons/store';

export const activateCoupon = async (item: ShopItemsType, entityId: number) => {
  const response = await get<IActivateCoupon>(
    `${apiRoutes.STORE_PURCHASES}${item}${apiRoutes.REDEEM}${entityId}`
  );
  return response.data;
};

interface IActivateCoupon {
  data: { msg: string };
  state: string;
}
