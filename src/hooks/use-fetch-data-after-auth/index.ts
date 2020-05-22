import { useEffect } from 'react';
import { fetchUserData } from '../../effector/user-data/events';
import { fetchTasks } from '../../effector/missions-store/events';

export const useFetchDataAfterAuth = (isAuthorized: boolean) => {
  useEffect(() => {
    if (isAuthorized) {
      fetchUserData('');
      fetchTasks('');
    }
  }, [isAuthorized]);
};
