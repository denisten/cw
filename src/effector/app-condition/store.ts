import { AppDomain } from './domain';
import {
  modalWindowClosed,
  modalWindowOpen,
  toggleModalWindow,
  updateScaleValue,
} from './events';
import { TowersTypes } from '../towers-progress/store';
import { ScaleValues } from '../../enums';

const initState = {
  isModalWindowOpen: false,
  scaleValue: 0.7,
  focusOn: TowersTypes.MAIN_TOWER,
};

export const AppConditionState = AppDomain.store<AppConditionType>(initState)
  .on(modalWindowOpen, (state, payload) => ({
    ...state,
    isModalWindowOpen: true,
    focusOn: payload,
  }))
  .on(modalWindowClosed, state => ({
    ...state,
    isModalWindowOpen: false,
    focusOn: TowersTypes.MAIN_TOWER,
  }))
  .on(toggleModalWindow, (state, payload) => ({
    ...state,
    isModalWindowOpen: !state.isModalWindowOpen,
    focusOn: payload,
  }))
  .on(updateScaleValue, (state, payload) => ({
    ...state,
    scaleValue: payload,
  }));

type AppConditionType = {
  isModalWindowOpen: boolean;
  focusOn: TowersTypes;
  scaleValue: ScaleValues;
};
