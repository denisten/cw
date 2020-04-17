import { AppDomain } from './domain';
import {
  extraTowerInfoModalClosed,
  extraTowerInfoModalOpen,
  toggleExtraTowerInfoModal,
  updateScaleValue,
  ScaleValues,
  menuOpened,
  menuClosed,
  showUpgradeIcon,
  editIsAuthorizedFlag,
  setAuthValue,
  setCancelAuthorizationStatus,
  setHideTowerInfo,
  setLoaded,
  setTowerInfoContent,
  setTowerInfoContentIndex,
} from './events';
import { TowersTypes } from '../towers-progress/store';
import { upgradeTower } from '../towers-progress/events';
import { MenuItems } from '../../UI/menu-paragraph';
import connectLocalStorage from 'effector-localstorage/sync';

export const maxProgressValue = 100;

const initScaleValue = 1;
export enum TowerInfoContentValues {
  TASK = 'task',
  CHAT = 'chat',
  DESCRIPTION = 'description',
}
const initState = {
  isExtraTowerInfoModalOpen: false,
  scaleValue: initScaleValue,
  focusOn: null,
  selectedMenuItem: null,
  upgradingTowerTitle: null,
  isAuthorized: false,
  authCancelledStatus: '',
  hideTowerInfo: false,
  loaded: false,
  selectTowerInfoContent: TowerInfoContentValues.DESCRIPTION,
  selectTowerInfoContentIndex: 0,
};

const appConditionLocalStorage = connectLocalStorage('AppCondition').onChange(
  setAuthValue
);

export const AppCondition = AppDomain.store<AppConditionType>(initState)
  .on(setTowerInfoContentIndex, (state, payload) => ({
    ...state,
    selectTowerInfoContentIndex: payload,
  }))
  .on(setTowerInfoContent, (state, payload) => ({
    ...state,
    selectTowerInfoContent: payload,
  }))
  .on(extraTowerInfoModalOpen, (state, payload) => ({
    ...state,
    isExtraTowerInfoModalOpen: true,
    focusOn: payload,
  }))
  .on(extraTowerInfoModalClosed, state => ({
    ...state,
    isExtraTowerInfoModalOpen: false,
    focusOn: null,
  }))
  .on(toggleExtraTowerInfoModal, state => ({
    ...state,
    isExtraTowerInfoModalOpen: !state.isExtraTowerInfoModalOpen,
  }))
  .on(updateScaleValue, (state, payload) => {
    let localScaleValue = payload;
    if (state.scaleValue === payload) localScaleValue = initScaleValue;
    return {
      ...state,
      scaleValue: Number((state.scaleValue + localScaleValue).toFixed(2)),
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
  }))
  .on(setHideTowerInfo, (state, payload) => ({
    ...state,
    hideTowerInfo: payload,
  }))
  .on(setLoaded, state => ({
    ...state,
    loaded: true,
  }));

AppCondition.watch(appConditionLocalStorage);

export type AppConditionType = {
  isExtraTowerInfoModalOpen: boolean;
  selectedMenuItem: MenuItems | null;
  focusOn: TowersTypes | null;
  scaleValue: ScaleValues;
  upgradingTowerTitle: TowersTypes | null;
  isAuthorized: boolean;
  authCancelledStatus: string;
  hideTowerInfo: boolean;
  loaded: boolean;
  selectTowerInfoContent: TowerInfoContentValues;
  selectTowerInfoContentIndex: number;
};
