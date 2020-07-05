import { TowersTypes } from '../../effector/towers-progress/store';
import { showUpgradeIcon } from '../../effector/app-condition/events';
import { tutorialTowerUpgrade } from '../../effector/towers-progress/events';

const delayBeforeAnimationEnd = 2500;

export const upgradeTowerAndShowAnimation = (towerTitle: TowersTypes) => {
  showUpgradeIcon(towerTitle);
  setTimeout(() => {
    tutorialTowerUpgrade(towerTitle);
    showUpgradeIcon(null);
  }, delayBeforeAnimationEnd);
};
