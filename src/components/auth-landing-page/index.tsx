import { useEffect } from 'react';
import {
  editIsAuthorizedFlag,
  setCancelAuthorizationStatus,
} from '../../effector/app-condition/events';
import { ResponseStatuses } from '../../constants';

const delayBeforeAuthWindowClose = 100;

export const AuthLandingPage = () => {
  useEffect(() => {
    const locationSearch = window.location.search;
    const state = new URLSearchParams(locationSearch).get('state');
    if (state === ResponseStatuses.SUCCESS) {
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
