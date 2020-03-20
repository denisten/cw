import { useEffect } from 'react';
import {
  editIsAuthorizedFlag,
  setCancellAuthorizationStatus,
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
      setCancellAuthorizationStatus(state.replace('_', ''));
    }
    setTimeout(() => {
      window.close();
    }, delayBeforeAuthWindowClose);
  }, []);
  return null;
};
