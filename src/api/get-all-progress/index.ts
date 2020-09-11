import { get } from '../requests';
import { apiRoutes } from '..';
import {
  TowersProgressStoreType,
  TowersTypes,
} from '../../effector/towers-progress/store';
import { calculateLevelUpPercent } from '../../utils/calculate-level-up-percent';

export const getAllProgress = async () => {
  const response = await get<{ data: TowersProgressStoreType }>(
    apiRoutes.GET_ALL_PROGRESS
  );

  Object.keys(response.data.data).forEach(product => {
    const tower = product as TowersTypes;
    response.data.data[tower].level.levelUpPercentage = calculateLevelUpPercent(
      response.data.data[tower].points,
      response.data.data[tower].level.minProgressValue,
      response.data.data[tower].level.maxProgressValue
    );
  });

  return response.data.data;
};
