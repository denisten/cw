import { get } from '../requests/get';
import { apiRoutes } from '..';
import {
  ShopItemsType,
  StoreItemTypes,
  PurchasStatuses,
} from '../../effector/coupons/store';

export const getUserPurchases = async () => {
  const response = await get<{ data: IUserPurchases }>(apiRoutes.GET_PURCHASES);
  return response.data.data;
};

interface IUserPurchases {
  items: {
    storeItem: {
      type: {
        slug: StoreItemTypes;
      };
      price: number;
      slug: ShopItemsType;
      name: string;
      description: string;
    };
    status: PurchasStatuses | null;
    count: number;
  }[];
}
