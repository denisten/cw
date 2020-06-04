import { apiRoutes } from '..';
import { post } from '../requests';
import { TowersTypes } from '../../effector/towers-progress/store';

export const updateTowerRequest = async (towerTitle: TowersTypes) => {
  return await post<IUpdateTower>(
    apiRoutes.PRODUCTS + `/${towerTitle}/` + apiRoutes.COMMIT_PROGRESS
  );
};

interface IUpdateTower {
  state: string;
}
