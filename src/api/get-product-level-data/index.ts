import { get } from '../requests';
import { apiRoutes } from '..';
import { ICurrentLevelData } from '../../effector/product-level/store';

export const getProductLevelData = async () => {
  const response = await get<IGetProductLevelData>(
    apiRoutes.PRODUCT_LEVEL_DATA
  );
  return response.data.data;
};

interface IGetProductLevelData {
  data: IGetProductLevelDataSubject[];
  state: string;
}

interface IGetProductLevelDataSubject extends ICurrentLevelData {
  id: number;
}
