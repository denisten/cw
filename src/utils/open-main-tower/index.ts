import { extraTowerInfoModalOpened } from '../../effector/app-condition/events';
import { TowersTypes } from '../../effector/towers-progress/store';
const X = 3672;
const Y = 2036;

export const openMainTower = () => {
  extraTowerInfoModalOpened({
    coords: [X, Y],
    towerTitle: TowersTypes.MAIN_TOWER,
  });
};
