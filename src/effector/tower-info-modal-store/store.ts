import { TowersDomain } from './domain';
import { TowersTypes } from '../towers-progress/store';
import {
  extraTowerInfoModalOpen,
  extraTowerInfoModalClosed,
  toggleExtraTowerInfoModal,
  setTowerInfoShift,
  setHideTowerInfo,
} from './events';

const initState = {
  focusOn: null,
  isExtraTowerInfoModalOpen: false,
  towerInfoShift: 0,
  hideTowerInfo: false,
};

export const TowerInfoModalStore = TowersDomain.store<ITowerInfoModalStore>(
  initState
)
  .on(setHideTowerInfo, (state, payload) => ({
    ...state,
    hideTowerInfo: payload,
  }))
  .on(setTowerInfoShift, (state, payload) => ({
    ...state,
    towerInfoShift: payload,
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
  }));

export interface ITowerInfoModalStore {
  focusOn: TowersTypes | null;
  isExtraTowerInfoModalOpen: boolean;
  towerInfoShift: number;
  hideTowerInfo: boolean;
}
