import { get } from '../../requests';
import { apiRoutes } from '../..';
import { IShopCatalog } from '../../../effector/coupons/store';

export const getShopCatalog = async () => {
  const response = await get<{ data: IShopCatalog[] }>(
    apiRoutes.GET_SHOP_CATALOG
  );
  return response.data.data;
};
