import { AppDomain } from './domain';
import {
  extraTowerInfoModalClosed,
  extraTowerInfoModalOpened,
  toggleExtraTowerInfoModal,
  updateScaleValue,
  ScaleValues,
  profileInfoModalWindowOpened,
  profileInfoModalWindowClosed,
} from './events';
import { TowersTypes } from '../towers-progress/store';

const initScaleValue = 1;

const initState = {
  isExtraTowerInfoModalOpen: false,
  scaleValue: initScaleValue,
  focusOn: TowersTypes.MAIN_TOWER,
  isProfileInfoModalOpen: false,
};

export const AppConditionState = AppDomain.store<AppConditionType>(initState)
  .on(extraTowerInfoModalOpened, (state, payload) => ({
    ...state,
    isExtraTowerInfoModalOpen: true,
    focusOn: payload,
  }))
  .on(extraTowerInfoModalClosed, state => ({
    ...state,
    isExtraTowerInfoModalOpen: false,
  }))
  .on(toggleExtraTowerInfoModal, (state, payload) => ({
    ...state,
    isExtraTowerInfoModalOpen: !state.isExtraTowerInfoModalOpen,
    focusOn: payload,
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
  }));

type AppConditionType = {
  isExtraTowerInfoModalOpen: boolean;
  isProfileInfoModalOpen: boolean;
  focusOn: TowersTypes;
  scaleValue: ScaleValues;
};
