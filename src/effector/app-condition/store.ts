import { AppDomain } from './domain';
import {
  extraTowerInfoModalClosed,
  extraTowerInfoModalOpened,
  toggleExtraTowerInfoModal,
  updateScaleValue,
  ScaleValues,
  menuOpened,
  menuClosed,
  updateFocusOnValue,
  ExtraTowerInfoModalOpenedProps,
  showUpgradeIcon,
  editIsAuthorizedFlag,
  nextTutorStep,
  nextTutorDescriptionStep,
  turnOffTutorialMode,
} from './events';
import { TowersTypes } from '../towers-progress/store';
import { upgradeTower } from '../towers-progress/events';
import { MenuItems } from '../../UI/menu-paragraph';

export const maxProgressValue = 100;
const initFocusXCord = 3693,
  initFocusYCord = 1949;

const initScaleValue = 1;

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
    coords: [initFocusXCord, initFocusYCord],
    towerTitle: null,
  },
  selectedMenuItem: null,
  upgradingTowerTitle: null,
  isAuthorized: false,
  tutorialCondition: TutorialConditions.OFF,
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
  .on(menuOpened, (state, payload) => ({
    ...state,
    selectedMenuItem: payload,
  }))
  .on(menuClosed, state => ({
    ...state,
    selectedMenuItem: null,
  }))
  .on(updateFocusOnValue, (state, payload) => ({
    ...state,
    focusOn: { ...state.focusOn, coords: payload },
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
  }))
  .on(editIsAuthorizedFlag, (state, payload) => ({
    ...state,
    isAuthorized: payload,
  }));

type AppConditionType = {
  isExtraTowerInfoModalOpen: boolean;
  selectedMenuItem: MenuItems | null;
  focusOn: ExtraTowerInfoModalOpenedProps;
  scaleValue: ScaleValues;
  upgradingTowerTitle: TowersTypes | null;
  isAuthorized: boolean;
  tutorialCondition: TutorialConditions;
  tutorialTextId: number;
};
