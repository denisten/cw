import { useEffect } from 'react';
import { setIsLogout } from '../../effector/app-condition/events';

export const LogoutLandingPage = () => {
  useEffect(() => {
    setIsLogout(true);
    window.close();
  }, []);
  return null;
};
