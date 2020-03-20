import { useEffect } from 'react';
import {
  editIsAuthorizedFlag,
  cancellAuthorization,
} from '../../effector/app-condition/events';

const delayBeforeAuthWindowClose = 100;
enum authStatuses {
  SUCCESS = 'success',
  ACCESS_DENIED = 'access_denied',
}

export const AuthLandingPage = () => {
  useEffect(() => {
    const locationSearch = window.location.search;
    const search = new URLSearchParams(locationSearch);
    const state = search.get('state');

    if (state === authStatuses.SUCCESS) {
      editIsAuthorizedFlag(true);
    } else if (state === authStatuses.ACCESS_DENIED) {
      cancellAuthorization(true);
    }
    setTimeout(() => {
      window.close();
    }, delayBeforeAuthWindowClose);
  }, []);
  return null;
};
