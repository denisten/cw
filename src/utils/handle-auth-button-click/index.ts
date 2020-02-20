import { editIsAuthorizedFlag } from '../../effector/app-condition/events';
import { TutorialConditions } from '../../effector/app-condition/store';

export const handleAuthButtonClick = (
  authFlag: boolean,
  tutorialCondition: TutorialConditions
) => {
  if (tutorialCondition !== TutorialConditions.SETTINGS_ARROW)
    editIsAuthorizedFlag(authFlag);
};
