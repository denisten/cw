import { editIsAuthorizedFlag } from '../../effector/app-condition/events';

export const handleAuthButtonClick = () => {
  editIsAuthorizedFlag(true);
};
