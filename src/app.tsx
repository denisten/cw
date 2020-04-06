import React, { useEffect } from 'react';
import { Route, Router, Switch } from 'react-router';
import { RootComponent } from './components/root-component/root-component';
import history from './history';
import { AuthLandingPage } from './components/auth-landing-page';
import { GlobalStyle } from './global-style';
import { ErrorBoundary } from './components/error-boundary';
import { fetchUserData } from './effector/user-data/events';
import { useStore } from 'effector-react';
import { AppCondition } from './effector/app-condition/store';
import { errorStringsParsingHOF } from './utils/error-handler';

export enum Routes {
  MAIN = '/',
  AUTH_LANDING_PAGE = '/auth-callback',
}

const PLUSKEYCODE = 61;
const MINUSKEYCODE = 173;

export const App = () => {
  const { isAuthorized, authCancelledStatus } = useStore(AppCondition);
  useEffect(() => {
    if (isAuthorized) {
      fetchUserData('');
    }
  }, [isAuthorized]);
  useEffect(() => {
    if (authCancelledStatus) {
      errorStringsParsingHOF(authCancelledStatus);
    }
  }, [authCancelledStatus]);

  const wheelPreventDefault = (e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  };

  const keyDownPreventDefault = (e: KeyboardEvent) => {
    if (
      e.ctrlKey &&
      (e.keyCode === PLUSKEYCODE || e.keyCode === MINUSKEYCODE)
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', wheelPreventDefault, { passive: false });
    window.addEventListener('keydown', keyDownPreventDefault, {
      passive: false,
    });
    return () => {
      window.removeEventListener('wheel', wheelPreventDefault);
      window.removeEventListener('keydown', keyDownPreventDefault);
    };
  }, []);
  return (
    <Router history={history}>
      <ErrorBoundary />
      <GlobalStyle />
      <Switch>
        <Route exact path={Routes.MAIN} component={RootComponent} />
        <Route path={Routes.AUTH_LANDING_PAGE} component={AuthLandingPage} />
      </Switch>
    </Router>
  );
};
