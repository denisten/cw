import React, { useEffect, Fragment } from 'react';
import { getCookie } from '../../utils/get-cookie';

export const authCookieKey = 'id_token';
const delayBeforeAuthWindowClose = 2000;

export const AuthLandingPage = () => {
  useEffect(() => {
    const cookie = getCookie(authCookieKey);
    if (cookie) {
      localStorage.setItem(authCookieKey, cookie);
    }
    setTimeout(() => {
      window.close();
    }, delayBeforeAuthWindowClose);
  }, []);
  return <Fragment />;
};
