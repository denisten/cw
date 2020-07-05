import { TowersTypes } from '../../effector/towers-progress/store';
import { scrollToCurrentTower } from '../scroll-to-current-tower';
import { BuildingsService } from '../../buildings/config';
import { AppCondition } from '../../effector/app-condition/store';

export const scrollToMainTower = () => {
  const { ref } = BuildingsService.getConfigForTower(TowersTypes.MAIN_TOWER);
  const { fullSizeMode } = AppCondition.getState();
  if (!fullSizeMode) scrollToCurrentTower(ref);
};
