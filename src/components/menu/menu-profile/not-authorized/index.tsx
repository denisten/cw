import React from 'react';
import {
  disableTutorialMode,
  nextTutorStep,
  setSuccessfulTutorial,
} from '../../../../effector/tutorial-store/events';
import {
  TutorialConditions,
  TutorialStore,
} from '../../../../effector/tutorial-store/store';
import { setOpenPopUpState } from '../../../../effector/app-condition/events';
import { TypesOfPopUps } from '../../../../UI/pop-up';
import { UserDataStore } from '../../../../effector/user-data/store';
import { handleAuthButtonClick } from '../../../../utils/handle-auth-button-click';
import { useStore } from 'effector-react';
import { reactGAEvent } from '../../../../utils/ga-event';
import { NotAuthorizedLayout } from './layout';
import { AppConditionStore } from '../../../../effector/app-condition/store';
import { maxCityNameLength } from '../authorized';

const popUpStyles = {
  width: 487,
  height: 305,
  padding: '76px 79px 0 79px',
};

export const NotAuthorizedProfile = () => {
  const { worldName, money } = useStore(UserDataStore);
  const { tutorialCondition } = useStore(TutorialStore);
  const { openPopUpState } = useStore(AppConditionStore);

  const popUpConfig = {
    callback: () => setOpenPopUpState(TypesOfPopUps.DISABLED),
    displayFlag: openPopUpState !== TypesOfPopUps.DISABLED,
    popUpStyles,
    maxInputValueLength: maxCityNameLength,
    title: 'Введите название города',
    initValue: worldName,
  };

  const handleButtonClick = async () => {
    if (tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON) {
      disableTutorialMode();
      setSuccessfulTutorial(true);
      reactGAEvent({
        eventLabel: 'voiti',
        eventCategory: 'onboarding',
        eventContent: 'otlichnaya_rabota',
        eventContext: 'step16',
        eventAction: 'button_click',
      });
    }
    await handleAuthButtonClick();
  };

  const handlePenClick = () => {
    setOpenPopUpState(TypesOfPopUps.EDIT_WORLD_NAME);
    if (tutorialCondition === TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME)
      nextTutorStep();
    reactGAEvent({
      eventLabel: 'city_name',
      eventCategory: 'onboarding',
      eventContext: 'step6',
    });
  };

  return (
    <NotAuthorizedLayout
      popUpConfig={popUpConfig}
      openPopUpState={openPopUpState}
      handleButtonClick={handleButtonClick}
      handlePenClick={handlePenClick}
      worldName={worldName}
      money={money}
      tutorialCondition={tutorialCondition}
    />
  );
};
