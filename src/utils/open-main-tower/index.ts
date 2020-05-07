import { extraTowerInfoModalOpen } from '../../effector/app-condition/events';
import { TowersTypes } from '../../effector/towers-progress/store';
import { scrollToCurrentTower } from '../scroll-to-current-tower';
import { BuildingsService } from '../../buildings/config';

export const openMainTower = () => {
  const { ref } = BuildingsService.getConfigForTower(TowersTypes.MAIN_TOWER);
  scrollToCurrentTower(ref);
  extraTowerInfoModalOpen(TowersTypes.MAIN_TOWER);
};
