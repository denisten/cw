import { useEffect } from 'react';
import { authCookieKey, CookieService } from '../../sevices/cookies';
import { editIsAuthorizedFlag } from '../../effector/app-condition/events';

const delayBeforeAuthWindowClose = 100000;

export const AuthLandingPage = () => {
  // const locationSearch = window.location.search;
  // const search = new URLSearchParams(locationSearch);

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
