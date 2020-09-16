import { useEffect } from 'react';
import {
  editIsAuthorizedFlag,
  setCancelAuthorizationStatus,
} from '../../effector/app-condition/events';
import { ResponseStatuses } from '../../constants';

export const AuthLandingPage = () => {
  useEffect(() => {
    const locationSearch = window.location.search;
    const state = new URLSearchParams(locationSearch).get('state');
    if (state === ResponseStatuses.SUCCESS) {
      editIsAuthorizedFlag(true);
    } else if (state) {
      setCancelAuthorizationStatus(state.replace('_', ''));
    }
    window.close();
  }, []);
  return null;
};
