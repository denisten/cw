import { AppDomain } from './domain';
import {
  showUpgradeIcon,
  editIsAuthorizedFlag,
  setAuthValue,
  setCancelAuthorizationStatus,
  setDOMLoaded,
  setTowerInfoContent,
  setDataReceived,
  setOpenPopUpState,
  setFullSizeMode,
  editTutorialSliderDisplayFlag,
  toggleAnimation,
} from './events';
import { TowersTypes } from '../towers-progress/store';
import { upgradeTower } from '../towers-progress/events';
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
  upgradingTowerTitle: null,
  isAuthorized: false,
  authCancelledStatus: '',
  DOMLoaded: false,
  selectTowerInfoContent: TowerInfoContentValues.DESCRIPTION,
  dataReceived: false,
  openPopUpState: TypesOfPopUps.DISABLED,
  haveCorrectCookie: false,
  fullSizeMode: false,
  animationOff: true,
};

const appConditionLocalStorage = connectLocalStorage('AppCondition').onChange(
  setAuthValue
);

export const AppConditionStore = AppDomain.store<AppConditionType>(initState)
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
  .on(setDOMLoaded, state => ({
    ...state,
    DOMLoaded: true,
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

AppConditionStore.watch(appConditionLocalStorage);

export type AppConditionType = {
  tutorialSliderDisplayFlag: boolean;
  upgradingTowerTitle: TowersTypes | null;
  isAuthorized: boolean;
  authCancelledStatus: string;
  DOMLoaded: boolean;
  selectTowerInfoContent: TowerInfoContentValues;
  dataReceived: boolean;
  openPopUpState: TypesOfPopUps;
  haveCorrectCookie: boolean;
  fullSizeMode: boolean;
  animationOff: boolean;
};
