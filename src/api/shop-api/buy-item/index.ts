import { post } from '../../requests';
import { apiRoutes } from '../..';
import {
  ShopItemsType,
  PurchasStatuses,
  ICatalogItems,
} from '../../../effector/coupons/store';

export const buyItemRequest = async (item: ShopItemsType) => {
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
