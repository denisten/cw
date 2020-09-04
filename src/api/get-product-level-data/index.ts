import { get } from '../requests';
import { apiRoutes } from '..';
import { IProductLevel } from '../../effector/product-level/store';

export const getProductLevelData = async () => {
  const response = await get<IGetProductLevelData>(
    apiRoutes.PRODUCT_LEVEL_DATA
  );
  return response.data.data;
};

interface IGetProductLevelData {
  data: IProductLevel[];
  state: string;
}
