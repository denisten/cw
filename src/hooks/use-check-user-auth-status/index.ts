import { useEffect } from 'react';
import { CookieService } from '../../sevices/cookies';
import { fetchUserData } from '../../effector/user-data/events';
import { fetchTasks } from '../../effector/missions-store/events';

export const useCheckUserAuthStatus = () => {
  useEffect(() => {
    if (CookieService.idToken) {
      fetchUserData('');
      fetchTasks('');
    }
  }, []);
};
