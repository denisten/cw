import { get } from '../requests';
import { apiRoutes } from '..';
import { TowersTypes } from '../../effector/towers-progress/store';

export type TowersTypesAsObjectLiteral = {
  [key in TowersTypes]: number;
};

export const getIncome = async () => {
  const response = await get<{ data: TowersTypesAsObjectLiteral }>(
    apiRoutes.GET_INCOMES
  );
  return response.data.data;
};
