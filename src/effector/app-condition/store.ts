import { AppDomain } from './domain';
import {
  extraTowerInfoModalClosed,
  extraTowerInfoModalOpened,
  toggleExtraTowerInfoModal,
  updateScaleValue,
  ScaleValues,
  profileInfoModalWindowOpened,
  profileInfoModalWindowClosed,
  updateFocusOnValue,
  taskModalWindowOpened,
  taskModalWindowClosed,
  ExtraTowerInfoModalOpenedProps,
  showUpgradeIcon,
  editIsAuthorizedFlag,
  nextTutorStep,
  nextTutorDescriptionStep,
  turnOffTutorialMode,
} from './events';
import { TowersTypes } from '../towers-progress/store';
import { upgradeTower } from '../towers-progress/events';

export const maxProgressValue = 100;

const initScaleValue = 1;
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const initFocusOnCoordsValues = [3693, 1949];

export enum TutorialConditions {
  OFF = 0,
  DIALOG = 1,
  TOWER_ARROW = 2,
  UNLOCK_BUTTON = 3,
  UPGRADE_ARROW = 4,
  PROFILE_ARROW = 5,
  SETTINGS_ARROW = 6,
  CHANGE_CITY_NAME_ARROW = 7,
  SAVE_CITY_NAME_ARROW = 8,
}

const initState = {
  isExtraTowerInfoModalOpen: false,
  scaleValue: initScaleValue,
  focusOn: {
    coords: initFocusOnCoordsValues,
    towerTitle: null,
  },
  isProfileInfoModalOpen: false,
  isTaskModalOpen: false,
  upgradingTowerTitle: null,
  isAuthorized: false,
  tutorialCondition: TutorialConditions.TOWER_ARROW,
  tutorialTextId: 0,
};

export const AppCondition = AppDomain.store<AppConditionType>(initState)
  .on(extraTowerInfoModalOpened, (state, payload) => ({
    ...state,
    isExtraTowerInfoModalOpen: true,
    focusOn: payload,
  }))
  .on(extraTowerInfoModalClosed, state => ({
    ...state,
    isExtraTowerInfoModalOpen: false,
    focusOn: {
      ...state.focusOn,
      towerTitle: null,
    },
  }))
  .on(toggleExtraTowerInfoModal, (state, payload) => ({
    ...state,
    isExtraTowerInfoModalOpen: !state.isExtraTowerInfoModalOpen,
    focusOn: { ...state.focusOn, coords: payload },
  }))
  .on(updateScaleValue, (state, payload) => {
    let localScaleValue = payload;
    if (state.scaleValue === payload) localScaleValue = initScaleValue;
    return {
      ...state,
      scaleValue: localScaleValue,
    };
  })
  .on(profileInfoModalWindowOpened, state => ({
    ...state,
    isProfileInfoModalOpen: true,
  }))
  .on(profileInfoModalWindowClosed, state => ({
    ...state,
    isProfileInfoModalOpen: false,
  }))
  .on(updateFocusOnValue, (state, payload) => ({
    ...state,
    focusOn: { ...state.focusOn, coords: payload },
  }))
  .on(taskModalWindowOpened, state => ({
    ...state,
    isTaskModalOpen: true,
  }))
  .on(taskModalWindowClosed, state => ({
    ...state,
    isTaskModalOpen: false,
  }))
  .on(showUpgradeIcon, (state, payload) => ({
    ...state,
    upgradingTowerTitle: payload,
  }))
  .on(upgradeTower, state => ({
    ...state,
    upgradingTowerTitle: null,
  }))
  .on(editIsAuthorizedFlag, (state, payload) => ({
    ...state,
    isAuthorized: payload,
  }))
  .on(nextTutorStep, state => ({
    ...state,
    tutorialCondition: state.tutorialCondition + 1,
  }))
  .on(nextTutorDescriptionStep, state => ({
    ...state,
    tutorialTextId: state.tutorialTextId + 1,
  }))
  .on(turnOffTutorialMode, state => ({
    ...state,
    tutorialCondition: TutorialConditions.OFF,
  }));

type AppConditionType = {
  isExtraTowerInfoModalOpen: boolean;
  isProfileInfoModalOpen: boolean;
  isTaskModalOpen: boolean;
  focusOn: ExtraTowerInfoModalOpenedProps;
  scaleValue: ScaleValues;
  upgradingTowerTitle: TowersTypes | null;
  isAuthorized: boolean;
  tutorialCondition: TutorialConditions;
  tutorialTextId: number;
};
