import { TutorialConditions } from '../../effector/tutorial-store/store';
import { TowersTypes } from '../../effector/towers-progress/store';
import { statusOk, delayBeforeUpdateTower } from '../../constants';
import { updateTowerRequest } from '../../api/updateTower';
import { upgradeTower } from '../../effector/towers-progress/events';
import {
  showUpgradeIcon,
  extraTowerInfoModalClosed,
} from '../../effector/app-condition/events';
import { nextTutorStep } from '../../effector/tutorial-store/events';

export const towerUpdateHandler = async (
  tutorialCondition: TutorialConditions,
  towerTitle: TowersTypes
) => {
  extraTowerInfoModalClosed();
  if (!tutorialCondition) {
    const resp = await updateTowerRequest(towerTitle);
    if (resp.status === statusOk) {
      upgradeTower(towerTitle);
    } else {
      showUpgradeIcon(null);
    }
  } else {
    setTimeout(() => {
      nextTutorStep();
      upgradeTower(towerTitle);
    }, delayBeforeUpdateTower);
  }
};
