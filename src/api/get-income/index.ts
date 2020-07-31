import { get } from '../requests';
import { apiRoutes } from '..';
import { TowersTypes } from '../../effector/towers-progress/store';
import { scoreSuccessRequests } from '../../effector/preloader/events';

export type TowersTypesAsObjectLiteral = {
  [key in TowersTypes]: number;
};

export const getIncome = async () => {
  const response = await get<{ data: TowersTypesAsObjectLiteral }>(
    apiRoutes.GET_INCOMES
  );
  scoreSuccessRequests();
  return response.data.data;
};
