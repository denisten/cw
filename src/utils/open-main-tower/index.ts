import { BuildingsService } from '../../buildings/config';
import { extraTowerInfoModalOpened } from '../../effector/app-condition/events';
import { TowersTypes } from '../../effector/towers-progress/store';

export const openMainTower = () => {
  const localService = new BuildingsService();
  const { coords } = localService.getConfigForTower(TowersTypes.MAIN_TOWER);
  extraTowerInfoModalOpened({
    coords: coords,
    towerTitle: TowersTypes.MAIN_TOWER,
  });
};
