import React, { useEffect } from 'react';
import { getCookie } from '../../utils/get-cookie';

export const AuthCookieKey = 'oauth';

export const AuthLandingPage = () => {
  useEffect(() => {
    const cookie = getCookie(AuthCookieKey);
    if (cookie) {
      localStorage.setItem(AuthCookieKey, cookie);
    }
    setTimeout(() => {
      window.close();
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 2000);
  }, []);
  return <div>AuthLandingPageText</div>;
};
