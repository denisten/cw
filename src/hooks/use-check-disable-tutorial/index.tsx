import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { disableTutorialMode } from '../../effector/tutorial-store/events';
enum hashValues {
  DISABLE_TUTORIAL = 'disableTutorial',
}

export const useCheckDisableTutorial = (
  dependency: (string | number | boolean)[]
) => {
  const location = useLocation();
  useEffect(() => {
    if (location.search.replace('?', '') === hashValues.DISABLE_TUTORIAL) {
      disableTutorialMode();
    }
  }, dependency);
};
