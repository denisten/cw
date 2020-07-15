import { AppDomain } from './domain';
import {
  menuOpened,
  menuClosed,
  showUpgradeIcon,
  editIsAuthorizedFlag,
  setAuthValue,
  setCancelAuthorizationStatus,
  setHideTowerInfo,
  setDOMLoaded,
  setTowerInfoContent,
  setTowerInfoShift,
  setDataReceived,
  setOpenPopUpState,
  setFullSizeMode,
  editTutorialSliderDisplayFlag,
  toggleAnimation,
} from './events';
import { TowersTypes } from '../towers-progress/store';
import { upgradeTower } from '../towers-progress/events';
import { MenuItems } from '../../UI/menu-paragraph';
import connectLocalStorage from 'effector-localstorage/sync';
import { devLogin, fetchUserData, getUserName } from '../user-data/events';
import { ErrorBoundaryStore } from '../error-boundary-store/store';
import { TypesOfPopUps } from '../../UI/pop-up';

export enum TowerInfoContentValues {
  DESCRIPTION = 0,
  CHAT = 1,
  TASK = 2,
}

const initState = {
  tutorialSliderDisplayFlag: false,
  selectedMenuItem: null,
  upgradingTowerTitle: null,
  isAuthorized: false,
  authCancelledStatus: '',
  hideTowerInfo: false,
  DOMLoaded: false,
  selectTowerInfoContent: TowerInfoContentValues.DESCRIPTION,
  towerInfoShift: 0,
  dataReceived: false,
  openPopUpState: TypesOfPopUps.DISABLED,
  haveCorrectCookie: false,
  fullSizeMode: false,
  animationOff: false,
};

const appConditionLocalStorage = connectLocalStorage('AppCondition').onChange(
  setAuthValue
);

export const AppCondition = AppDomain.store<AppConditionType>(initState)
  .on(toggleAnimation, state => ({
    ...state,
    animationOff: !state.animationOff,
  }))
  .on(setFullSizeMode, (state, payload) => ({
    ...state,
    fullSizeMode: payload,
  }))
  .on(editTutorialSliderDisplayFlag, (state, payload) => ({
    ...state,
    tutorialSliderDisplayFlag: payload,
  }))
  .on(setTowerInfoContent, (state, payload) => ({
    ...state,
    selectTowerInfoContent: payload,
  }))
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
  .on(setDOMLoaded, state => ({
    ...state,
    DOMLoaded: true,
  }))
  .on(setTowerInfoShift, (state, payload) => ({
    ...state,
    towerInfoShift: payload,
  }))
  .on(setDataReceived, (state, payload) => ({
    ...state,
    dataReceived: payload,
  }))
  .on(fetchUserData.doneData, state => {
    const { errorFlag } = ErrorBoundaryStore.getState();
    return {
      ...state,
      isAuthorized: !errorFlag,
      haveCorrectCookie: !errorFlag,
    };
  })
  .on(devLogin.doneData, state => {
    const { errorFlag } = ErrorBoundaryStore.getState();
    return {
      ...state,
      isAuthorized: !errorFlag,
    };
  })
  .on(getUserName, state => {
    const { errorFlag } = ErrorBoundaryStore.getState();
    return {
      ...state,
      haveCorrectCookie: !errorFlag,
    };
  })
  .on(setOpenPopUpState, (state, payload) => ({
    ...state,
    openPopUpState: payload,
  }));

AppCondition.watch(appConditionLocalStorage);

export type AppConditionType = {
  tutorialSliderDisplayFlag: boolean;
  selectedMenuItem: MenuItems | null;
  upgradingTowerTitle: TowersTypes | null;
  isAuthorized: boolean;
  authCancelledStatus: string;
  hideTowerInfo: boolean;
  DOMLoaded: boolean;
  selectTowerInfoContent: TowerInfoContentValues;
  towerInfoShift: number;
  dataReceived: boolean;
  openPopUpState: TypesOfPopUps;
  haveCorrectCookie: boolean;
  fullSizeMode: boolean;
  animationOff: boolean;
};
