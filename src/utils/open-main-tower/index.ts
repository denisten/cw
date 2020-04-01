import { userSelectedTower } from '../../effector/app-condition/events';
import {
  TowersProgressStore,
  TowersTypes,
} from '../../effector/towers-progress/store';
import { scrollToCurrentTower } from '../scroll-to-current-tower';

export const openMainTower = () => {
  const { ref } = TowersProgressStore.getState().mainTower;
  scrollToCurrentTower(ref);
  userSelectedTower({
    towerTitle: TowersTypes.MAIN_TOWER,
  });
};
