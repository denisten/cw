import { TowersDomain } from './domain';
import { TowersTypes } from '../towers-progress/store';
import {
  extraTowerInfoModalOpen,
  extraTowerInfoModalClosed,
  toggleExtraTowerInfoModal,
} from './events';

const initState = {
  focusOn: null,
  isExtraTowerInfoModalOpen: false,
};

export const TowersStore = TowersDomain.store<AppConditionType>(initState)
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

export type AppConditionType = {
  focusOn: TowersTypes | null;
  isExtraTowerInfoModalOpen: boolean;
};
