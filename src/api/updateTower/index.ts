import { apiRoutes } from '..';
import { post } from '../requests';
import { TowersTypes } from '../../effector/towers-progress/store';

export const updateTower = async (towerTitle: TowersTypes) => {
  const response = await post<IUpdateTower>(
    apiRoutes.PRODUCTS + `/${towerTitle}/` + apiRoutes.COMMIT_PROGRESS
  );
  return response;
};

interface IUpdateTower {
  state: string;
}
