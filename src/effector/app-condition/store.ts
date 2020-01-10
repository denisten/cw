import { AppDomain } from './domain';
import {
  modalWindowClosed,
  modalWindowOpen,
  toggleModalWindow,
} from './events';

const initState = {
  isModalWindowOpen: false,
};

export const AppConditionState = AppDomain.store(initState)
  .on(modalWindowOpen, state => ({
    ...state,
    isModalWindowOpen: true,
  }))
  .on(modalWindowClosed, state => ({
    ...state,
    isModalWindowOpen: false,
  }))
  .on(toggleModalWindow, state => ({
    ...state,
    isModalWindowOpen: !state.isModalWindowOpen,
  }));
