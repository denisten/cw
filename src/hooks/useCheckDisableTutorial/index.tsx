import { useEffect } from 'react';
import { turnOffTutorialMode } from '../../effector/app-condition/events';
import { useLocation } from 'react-router';
enum hashValues {
  DISABLE_TUTORIAL = 'disableTutorial',
}

export const useCheckDisableTutorial = (
  dependency: (string | number | boolean)[]
) => {
  const location = useLocation();
  useEffect(() => {
    if (location.search.replace('?', '') === hashValues.DISABLE_TUTORIAL) {
      turnOffTutorialMode();
    }
  }, dependency);
};
