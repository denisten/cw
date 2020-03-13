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
  setAuthValue,
} from './events';
import { TowersTypes } from '../towers-progress/store';
import { upgradeTower } from '../towers-progress/events';
import { MenuItems } from '../../UI/menu-paragraph';
import connectLocalStorage from 'effector-localstorage/sync';
export const maxProgressValue = 100;
const initFocusXCord = 3693,
  initFocusYCord = 1949;

const initScaleValue = 1;

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
};

const appConditionLocalStorage = connectLocalStorage('AppCondition').onChange(
  setAuthValue
);

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
  .on(setAuthValue, (state, { isAuthorized }) => ({ ...state, isAuthorized }));

AppCondition.watch(appConditionLocalStorage);

export type AppConditionType = {
  isExtraTowerInfoModalOpen: boolean;
  selectedMenuItem: MenuItems | null;
  focusOn: ExtraTowerInfoModalOpenedProps;
  scaleValue: ScaleValues;
  upgradingTowerTitle: TowersTypes | null;
  isAuthorized: boolean;
};
