import { TutorialDomain } from './domain';
import {
  nextTutorDescriptionStep,
  nextTutorStep,
  disableTutorialMode,
  pauseTutorialMode,
  enableTutorialMode,
  setTutorialOnAuthorizedUserFlag,
  setTutorialCondition,
  setSuccessfulTutorial,
} from './events';

export enum TutorialConditions {
  OFF = 0,
  DIALOG_HELLO = 'DIALOG_HELLO',
  PULSE_MENU_CHANGE_CITY_NAME = 'PULSE_MENU_CHANGE_CITY_NAME',
  PULSE_EDIT_CHANGE_CITY_NAME = 'PULSE_EDIT_CHANGE_CITY_NAME',
  PULSE_SAVE_CHANGE_CITY_NAME = 'PULSE_SAVE_CHANGE_CITY_NAME',
  DIALOG_CONFIRM_CITY_NAME = 'DIALOG_CONFIRM_CITY_NAME',
  DIALOG_START_MISSION = 'DIALOG_START_MISSION',
  ARROW_TOWER_INFO = 'ARROW_TOWER_INFO',
  NEXT_BUTTON_TOWER_INFO = 'NEXT_BUTTON_TOWER_INFO',
  UPGRADE_BUTTON_TOWER_INFO = 'UPGRADE_BUTTON_TOWER_INFO',
  DIALOG_AUTH = 'DIALOG_AUTH',
  PULSE_MENU_AUTH = 'PULSE_MENU_AUTH',
  PULSE_AUTH_BUTTON = 'PULSE_AUTH_BUTTON',
  FINAL_DIALOG_WITH_AUTH_USER = 'FINAL_DIALOG_WITH_AUTH_USER',
}

const TutorialSteps = [
  TutorialConditions.OFF,
  TutorialConditions.DIALOG_HELLO,
  TutorialConditions.PULSE_MENU_CHANGE_CITY_NAME,
  TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME,
  TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME,
  TutorialConditions.DIALOG_CONFIRM_CITY_NAME,
  TutorialConditions.ARROW_TOWER_INFO,
  TutorialConditions.DIALOG_START_MISSION,
  TutorialConditions.NEXT_BUTTON_TOWER_INFO,
  TutorialConditions.UPGRADE_BUTTON_TOWER_INFO,
  TutorialConditions.DIALOG_AUTH,
  TutorialConditions.PULSE_MENU_AUTH,
  TutorialConditions.PULSE_AUTH_BUTTON,
];

const initState = {
  tutorialCondition: TutorialConditions.OFF,
  tutorialConditionIdx: 0,
  tutorialTextId: 0,
  tutorialPause: false,
  tutorialOnAuthorizedUser: false,
  successfulTutorial: false,
};

export const TutorialStore = TutorialDomain.store<ITutorialStore>(initState)
  .on(setSuccessfulTutorial, (state, payload) => ({
    ...state,
    successfulTutorial: payload,
  }))
  .on(setTutorialCondition, (state, payload) => ({
    ...state,
    tutorialCondition: payload,
  }))
  .on(setTutorialOnAuthorizedUserFlag, (state, payload) => ({
    ...state,
    tutorialOnAuthorizedUser: payload,
  }))
  .on(nextTutorStep, state => ({
    ...state,
    tutorialConditionIdx: state.tutorialConditionIdx + 1,
    tutorialCondition: TutorialSteps[state.tutorialConditionIdx + 1],
    tutorialPause: false,
  }))
  .on(nextTutorDescriptionStep, state => ({
    ...state,
    tutorialTextId: state.tutorialTextId + 1,
  }))
  .on(enableTutorialMode, state => ({
    ...state,
    tutorialCondition: TutorialConditions.DIALOG_HELLO,
    tutorialConditionIdx: 1,
  }))
  .on(disableTutorialMode, state => ({
    ...state,
    tutorialCondition: TutorialConditions.OFF,
    tutorialConditionIdx: 0,
    tutorialOnAuthorizedUser: false,
  }))
  .on(pauseTutorialMode, state => ({
    ...state,
    tutorialPause: true,
  }));

interface ITutorialStore {
  tutorialCondition: TutorialConditions;
  tutorialConditionIdx: number;
  tutorialTextId: number;
  tutorialPause: boolean;
  tutorialOnAuthorizedUser: boolean;
  successfulTutorial: boolean;
}
