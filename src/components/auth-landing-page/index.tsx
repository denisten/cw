import { useEffect } from 'react';
import {
  editIsAuthorizedFlag,
  setCancelAuthorizationStatus,
} from '../../effector/app-condition/events';

const delayBeforeAuthWindowClose = 100;
enum authStatuses {
  SUCCESS = 'success',
}

export const AuthLandingPage = () => {
  useEffect(() => {
    const locationSearch = window.location.search;
    const state = new URLSearchParams(locationSearch).get('state');
    if (state === authStatuses.SUCCESS) {
      editIsAuthorizedFlag(true);
    } else if (state) {
      setCancelAuthorizationStatus(state.replace('_', ''));
    }
    setTimeout(() => {
      window.close();
    }, delayBeforeAuthWindowClose);
  }, []);
  return null;
};
