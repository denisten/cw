import { get } from '../requests';
import { apiRoutes } from '..';
import {
  TowersProgressStoreType,
  ITowerProgress,
} from '../../effector/towers-progress/store';

const temporaryZeroingPoints = (object: { [key: string]: ITowerProgress }) => {
  for (const key in object) {
    const element = object[key];
    element.points = 0;
  }
};

export const getAllProgress = async () => {
  const response = await get<{ data: TowersProgressStoreType }>(
    apiRoutes.GET_ALL_PROGRESS
  );
  temporaryZeroingPoints(response.data.data);
  return response.data.data;
};
