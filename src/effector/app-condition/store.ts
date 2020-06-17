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
  setDOMLoaded,
  setTowerInfoContent,
  setTowerInfoShift,
  setDataReceived,
  setOpenPopUpState,
  pushMoveElems,
  removeMoveElems,
} from './events';
import { TowersTypes } from '../towers-progress/store';
import { upgradeTower } from '../towers-progress/events';
import { MenuItems } from '../../UI/menu-paragraph';
import connectLocalStorage from 'effector-localstorage/sync';
import { devLogin, fetchUserData } from '../user-data/events';
import { ErrorBoundaryStore } from '../error-boundary-store/store';
import { TypesOfPopUps } from '../../UI/pop-up';

export const maxProgressValue = 100;

const initScaleValue = 0.9;
const randomRangeID = 1000;
export enum TowerInfoContentValues {
  DESCRIPTION = 0,
  CHAT = 1,
  TASK = 2,
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
  DOMLoaded: false,
  selectTowerInfoContent: TowerInfoContentValues.DESCRIPTION,
  towerInfoShift: 0,
  dataReceived: false,
  openPopUpState: TypesOfPopUps.DISABLED,
  moveCoinElements: [],
};

const appConditionLocalStorage = connectLocalStorage('AppCondition').onChange(
  setAuthValue
);

export const AppCondition = AppDomain.store<AppConditionType>(initState)

  .on(removeMoveElems, (state, id) => ({
    ...state,
    moveCoinElements: state.moveCoinElements.filter(item => item.id !== id),
  }))
  .on(pushMoveElems, (state, payload) => {
    const newState = { ...state };
    const coinObject = { ...payload };
    if (newState.moveCoinElements.length === 0) {
      coinObject.id = 0;
    } else {
      coinObject.id =
        newState.moveCoinElements.length +
        Math.floor(Math.random() * Math.floor(randomRangeID));
    }
    newState.moveCoinElements = [...newState.moveCoinElements, coinObject];
    return newState;
  })
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
    };
  })
  .on(devLogin.doneData, state => {
    const { errorFlag } = ErrorBoundaryStore.getState();
    return {
      ...state,
      isAuthorized: !errorFlag,
    };
  })
  .on(setOpenPopUpState, (state, payload) => ({
    ...state,
    openPopUpState: payload,
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
  DOMLoaded: boolean;
  selectTowerInfoContent: TowerInfoContentValues;
  towerInfoShift: number;
  dataReceived: boolean;
  openPopUpState: TypesOfPopUps;
  moveCoinElements: ImoveCoinElements[];
};

export interface ImoveCoinElements {
  x: number;
  y: number;
  id: number;
}
