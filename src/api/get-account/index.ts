import { get } from '../requests';
import { apiRoutes } from '..';
import { TowersTypes } from '../../effector/towers-progress/store';
import { IIncomesData } from '../commit-income';

export type TowersTypesAsObjectLiteral = {
  [key in TowersTypes]: number;
};

export const getAccount = async () => {
  const response = await get<IIncomesData>(apiRoutes.USER_ACCOUNT);
  return response.data.data;
};
