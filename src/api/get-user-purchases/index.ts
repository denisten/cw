import { get } from '../requests/get';
import { apiRoutes } from '..';
import { PurchasesType, CouponTypes } from '../../effector/store/store';

export const getUserPurchases = async () => {
  const response = await get<{ data: IUserPurchases }>(apiRoutes.GET_PURCHASES);
  return response.data.data;
};

interface IUserPurchases {
  items: {
    storeItem: {
      type: {
        slug: PurchasesType;
      };
      price: number;
      slug: CouponTypes;
      name: string;
      description: string;
    };
    status: string;
    count: number;
  }[];
}
