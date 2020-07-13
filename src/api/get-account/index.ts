import { get } from '../requests';
import { apiRoutes } from '..';
import { IIncomesData } from '../commit-income';

export const getAccount = async () => {
  const response = await get<IIncomesData>(apiRoutes.USER_ACCOUNT);
  return response.data.data;
};
