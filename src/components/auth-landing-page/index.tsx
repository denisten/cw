import { useEffect } from 'react';
import { editIsAuthorizedFlag } from '../../effector/app-condition/events';

const delayBeforeAuthWindowClose = 1000;

export const AuthLandingPage = () => {
  useEffect(() => {
    const locationSearch = window.location.search;
    const search = new URLSearchParams(locationSearch);
    const state = search.get('state');

    if (state === 'success') {
      editIsAuthorizedFlag(true);
    } else if (state === 'access_denied') {
    }
    setTimeout(() => {
      window.close();
    }, delayBeforeAuthWindowClose);
  }, []);
  return null;
};
