import { get } from '../requests/get';
import { apiRoutes } from '..';
import { PurchasStatuses, ICatalogItems } from '../../effector/coupons/store';

export const getUserPurchases = async () => {
  const response = await get<{ data: IUserPurchases }>(apiRoutes.GET_PURCHASES);
  return response.data.data;
};

interface IUserPurchases {
  items: {
    storeItem: ICatalogItems;
    status: PurchasStatuses | null;
    count: number;
  }[];
}
