import { useEffect } from 'react';
import { CookieService } from '../../sevices/cookies';
import { fetchUserData, getUserName } from '../../effector/user-data/events';

export const useCheckUserAuthStatus = () => {
  useEffect(() => {
    if (CookieService.idToken) {
      getUserName('');
    }
  }, []);
};
