import { TutorialDomain } from './domain';
import {
  nextTutorDescriptionStep,
  nextTutorStep,
  turnOffTutorialMode,
} from './events';

export enum TutorialConditions {
  OFF = 0,
  DIALOG_HELLO = 'DIALOG_HELLO',
  PULSE_MENU_CHANGE_CITY_NAME = 'PULSE_MENU_CHANGE_CITY_NAME',
  PULSE_SETTINGS_CHANGE_CITY_NAME = 'PULSE_SETTINGS_CHANGE_CITY_NAME',
  PULSE_EDIT_CHANGE_CITY_NAME = 'PULSE_EDIT_CHANGE_CITY_NAME',
  PULSE_SAVE_CHANGE_CITY_NAME = 'PULSE_SAVE_CHANGE_CITY_NAME',
  DIALOG_CONFIRM_CITY_NAME = 'DIALOG_CONFIRM_CITY_NAME',
  ARROW_TOWER_INFO = 'ARROW_TOWER_INFO',
  NEXT_BUTTON_TOWER_INFO = 'NEXT_BUTTON_TOWER_INFO',
  UPGRADE_BUTTON_TOWER_INFO = 'UPGRADE_BUTTON_TOWER_INFO',
  DIALOG_AUTH = 'DIALOG_AUTH',
  PULSE_MENU_AUTH = 'PULSE_MENU_AUTH',
  PULSE_AUTH_BUTTON = 'PULSE_AUTH_BUTTON',
}

const TutorialSteps = [
  TutorialConditions.OFF,
  TutorialConditions.DIALOG_HELLO,
  TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME,
  TutorialConditions.PULSE_SETTINGS_CHANGE_CITY_NAME,
  TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME,
  TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME,
  TutorialConditions.DIALOG_CONFIRM_CITY_NAME,
  TutorialConditions.ARROW_TOWER_INFO,
  TutorialConditions.NEXT_BUTTON_TOWER_INFO,
  TutorialConditions.UPGRADE_BUTTON_TOWER_INFO,
  TutorialConditions.DIALOG_AUTH,
  TutorialConditions.PULSE_MENU_AUTH,
  TutorialConditions.PULSE_AUTH_BUTTON,
];

const initState = {
  tutorialCondition: TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME,
  tutorialConditionIdx: 2,
  tutorialTextId: 0,
};

export const TutorialStore = TutorialDomain.store<ITutorialStore>(initState)
  .on(nextTutorStep, state => ({
    ...state,
    tutorialConditionIdx: state.tutorialConditionIdx + 1,
    tutorialCondition: TutorialSteps[state.tutorialConditionIdx + 1],
  }))
  .on(nextTutorDescriptionStep, state => ({
    ...state,
    tutorialTextId: state.tutorialTextId + 1,
  }))
  .on(turnOffTutorialMode, state => ({
    ...state,
    tutorialCondition: TutorialConditions.OFF,
    tutorialConditionIdx: 0,
  }));

interface ITutorialStore {
  tutorialCondition: TutorialConditions;
  tutorialConditionIdx: number;
  tutorialTextId: number;
}
