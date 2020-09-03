import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import { TowersTypes } from '../../effector/towers-progress/store';
import { statusOk } from '../../constants';
import { updateTowerRequest } from '../../api/updateTower';
import { upgradeTower } from '../../effector/towers-progress/events';
import { showUpgradeIcon } from '../../effector/app-condition/events';
import {
  nextTutorStep,
  setTutorialCondition,
} from '../../effector/tutorial-store/events';
import { upgradeTowerAndShowAnimation } from '../upgrade-tower-and-show-animation';
import { extraTowerInfoModalClosed } from '../../effector/tower-info-modal-store/events';

const delayMS = 2000;
const delayBeforeUpgrade = () =>
  new Promise(resolve => setTimeout(resolve, delayMS));

export const towerUpdateHandler = async (
  tutorialCondition: TutorialConditions,
  towerTitle: TowersTypes
) => {
  extraTowerInfoModalClosed();
  if (!tutorialCondition) {
    await delayBeforeUpgrade();
    const resp = await updateTowerRequest(towerTitle);
    if (resp.status === statusOk) {
      upgradeTower(towerTitle);
    } else {
      showUpgradeIcon(null);
    }
  } else {
    upgradeTowerAndShowAnimation(towerTitle);
    const { tutorialOnAuthorizedUser } = TutorialStore.getState();
    if (tutorialOnAuthorizedUser) {
      setTutorialCondition(TutorialConditions.FINAL);
    } else {
      nextTutorStep();
    }
  }
};
