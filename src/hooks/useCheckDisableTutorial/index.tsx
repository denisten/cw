import { useEffect } from 'react';
import { turnOffTutorialMode } from '../../effector/app-condition/events';
import { useLocation } from 'react-router';

export const useCheckDisableTutorial = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.search.replace('?', '') === 'disableTutorial') {
      turnOffTutorialMode();
    }
  }, []);
};
