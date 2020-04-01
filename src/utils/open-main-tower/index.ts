import { extraTowerInfoModalOpened } from '../../effector/app-condition/events';
import { TowersTypes } from '../../effector/towers-progress/store';
const initCoordX = 3672;
const initCoordY = 2036;

export const openMainTower = () => {
  extraTowerInfoModalOpened({
    coords: [initCoordX, initCoordY],
    towerTitle: TowersTypes.MAIN_TOWER,
  });
};
