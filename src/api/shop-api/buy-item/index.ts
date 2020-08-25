import { post } from '../../requests';
import { apiRoutes } from '../..';
import {
  CouponTypes,
  PurchasStatuses,
  ICatalogItems,
} from '../../../effector/coupons/store';

export const buyItemRequest = async (data: {
  item: CouponTypes | string;
  quantity: number;
}) => {
  const response = await post<{ data: IBuyItem }>(
    `${apiRoutes.STORE_ITEMS}${data.item}/buy`,
    { quantity: data.quantity }
  );
  return response.data.data;
};

interface IBuyItem {
  storeItem: ICatalogItems;
  status: PurchasStatuses;
  count: number;
}
