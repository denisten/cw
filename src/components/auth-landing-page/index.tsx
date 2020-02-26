import { useEffect } from 'react';
import { authCookieKey, CookieService } from '../../sevices/cookies';
import { editIsAuthorizedFlag } from '../../effector/app-condition/events';

const delayBeforeAuthWindowClose = 1000;

export const AuthLandingPage = () => {
  useEffect(() => {
    const cookie = CookieService.idToken;
    if (cookie) {
      localStorage.setItem(authCookieKey, cookie);
      editIsAuthorizedFlag(true);
    }
    setTimeout(() => {
      window.close();
    }, delayBeforeAuthWindowClose);
  }, []);
  return null;
};
