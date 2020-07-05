import { TowersTypes } from '../../effector/towers-progress/store';
import { scrollToCurrentTower } from '../scroll-to-current-tower';
import { BuildingsService } from '../../buildings/config';

export const scrollToMainTower = () => {
  const { ref } = BuildingsService.getConfigForTower(TowersTypes.MAIN_TOWER);
  scrollToCurrentTower(ref);
};
