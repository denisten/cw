import { TowersTypes } from '../../effector/towers-progress/store';
import { showUpgradeIcon } from '../../effector/app-condition/events';
import { upgradeTower } from '../../effector/towers-progress/events';

const delayBeforeAnimationEnd = 2500;

export const upgradeTowerAndShowAnimation = (towerTitle: TowersTypes) => {
  showUpgradeIcon(towerTitle);
  setTimeout(() => {
    upgradeTower(towerTitle);
  }, delayBeforeAnimationEnd);
};
