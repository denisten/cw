import { post } from '../../requests';
import { apiRoutes } from '../..';
import {
  CouponTypes,
  PurchasStatuses,
  ICatalogItems,
  PromocodeTypes,
} from '../../../effector/coupons/store';

export const buyItemRequest = async (data: {
  item: CouponTypes | PromocodeTypes;
  quantity: number;
}) => {
  const response = await post<{ data: IBuyItem }>(
    `${apiRoutes.STORE_ITEMS}${data.item}/buy`,
    data.quantity
  );
  return response.data.data;
};

interface IBuyItem {
  storeItem: ICatalogItems;
  status: PurchasStatuses;
  count: number;
}
