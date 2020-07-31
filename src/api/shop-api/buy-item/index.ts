import { post } from '../../requests';
import { apiRoutes } from '../..';
import {
  CouponTypes,
  PurchasStatuses,
  ICatalogItems,
  PromocodeTypes,
} from '../../../effector/coupons/store';

export const buyItemRequest = async (item: CouponTypes | PromocodeTypes) => {
  const response = await post<{ data: IBuyItem }>(
    `${apiRoutes.STORE_ITEMS}${item}/buy`
  );
  return response.data.data;
};

interface IBuyItem {
  storeItem: ICatalogItems;
  status: PurchasStatuses;
  count: number;
}
