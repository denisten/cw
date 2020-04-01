import { AppDomain } from './domain';
import {
  extraTowerInfoModalClosed,
  userSelectedTower,
  toggleExtraTowerInfoModal,
  updateScaleValue,
  ScaleValues,
  menuOpened,
  menuClosed,
  IUserSelectedTower,
  showUpgradeIcon,
  editIsAuthorizedFlag,
  setAuthValue,
  setCancelAuthorizationStatus,
} from './events';
import { TowersTypes } from '../towers-progress/store';
import { upgradeTower } from '../towers-progress/events';
import { MenuItems } from '../../UI/menu-paragraph';
import connectLocalStorage from 'effector-localstorage/sync';
export const maxProgressValue = 100;

const initScaleValue = 0.5;

const initState = {
  isExtraTowerInfoModalOpen: false,
  scaleValue: initScaleValue,
  focusOn: {
    towerTitle: null,
  },
  selectedMenuItem: null,
  upgradingTowerTitle: null,
  isAuthorized: false,
  authCancelledStatus: '',
};

const appConditionLocalStorage = connectLocalStorage('AppCondition').onChange(
  setAuthValue
);

export const AppCondition = AppDomain.store<AppConditionType>(initState)
  .on(userSelectedTower, (state, payload) => ({
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
  .on(setCancelAuthorizationStatus, (state, payload) => ({
    ...state,
    authCancelledStatus: payload,
  }))
  .on(setAuthValue, (state, { isAuthorized, authCancelledStatus }) => ({
    ...state,
    isAuthorized,
    authCancelledStatus,
  }));

AppCondition.watch(appConditionLocalStorage);

export type AppConditionType = {
  isExtraTowerInfoModalOpen: boolean;
  selectedMenuItem: MenuItems | null;
  focusOn: IUserSelectedTower;
  scaleValue: ScaleValues;
  upgradingTowerTitle: TowersTypes | null;
  isAuthorized: boolean;
  authCancelledStatus: string;
};
