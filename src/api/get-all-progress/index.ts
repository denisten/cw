import { get } from '../requests';
import { apiRoutes } from '..';
import { TowersProgressStoreType } from '../../effector/towers-progress/store';

export const getAllProgress = async () => {
  const response = await get<{ data: TowersProgressStoreType }>(
    apiRoutes.GET_ALL_PROGRESS
  );
  return response.data.data;
};
