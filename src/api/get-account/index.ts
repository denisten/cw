import { get } from '../requests';
import { apiRoutes } from '..';
import { TowersTypes } from '../../effector/towers-progress/store';

export type TowersTypesAsObjectLiteral = {
  [key in TowersTypes]: number;
};

export const getAccount = async () => {
  const response = await get(apiRoutes.USER_ACCOUNT);
  return response;
};
