import { editIsAuthorizedFlag } from '../../effector/app-condition/events';
import { disableTutorialMode } from '../../effector/tutorial-store/events';
import { disableTutorialRequest } from '../../api/disable-tutorial';

export const finishTutorialOnAuthUser = () => {
  disableTutorialMode();
  disableTutorialRequest();
  editIsAuthorizedFlag(true);
};
