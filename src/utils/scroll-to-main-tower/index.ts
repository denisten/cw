import { TowersProgressStore } from '../../effector/towers-progress/store';
import { scrollToCurrentTower } from '../scroll-to-current-tower';

export const scrollToMainTower = () => {
  const { ref } = TowersProgressStore.getState().mainTower;
  scrollToCurrentTower(ref);
};
