import { editIsAuthorizedFlag } from '../../effector/app-condition/events';

export const handleAuthButtonClick = (authFlag: boolean) => {
  editIsAuthorizedFlag(authFlag);
};
