import { editIsAuthorizedFlag } from '../../effector/app-condition/events';
import { authCookieKey } from '../../components/auth-landing-page';

export const handleLogoutButtonClick = () => {
  localStorage.removeItem(authCookieKey);
  editIsAuthorizedFlag(false);
};
