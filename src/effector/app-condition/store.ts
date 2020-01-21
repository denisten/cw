import { AppDomain } from './domain';
import {
  extraTowerInfoModalClosed,
  extraTowerInfoModalOpened,
  toggleExtraTowerInfoModal,
  updateScaleValue,
  ScaleValues,
  profileInfoModalWindowOpened,
  profileInfoModalWindowClosed,
  updateFocusOnValue,
} from './events';

const initScaleValue = 1;
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const initFocusOnValue = [2748, 1313];

const initState = {
  isExtraTowerInfoModalOpen: false,
  scaleValue: initScaleValue,
  focusOn: initFocusOnValue,
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
  }))
  .on(updateFocusOnValue, (state, payload) => ({
    ...state,
    focusOn: payload,
  }));

type AppConditionType = {
  isExtraTowerInfoModalOpen: boolean;
  isProfileInfoModalOpen: boolean;
  focusOn: number[];
  scaleValue: ScaleValues;
};
