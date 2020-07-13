import { useEffect } from 'react';
import { CookieService } from '../../sevices/cookies';
import { getUserName } from '../../effector/user-data/events';

export const useCheckUserAuthStatus = () => {
  useEffect(() => {
    if (CookieService.idToken) {
      getUserName('');
    }
  }, []);
};
