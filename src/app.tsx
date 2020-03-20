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
import { errorParsingHOF } from './utils/error-handler';

export enum Routes {
  MAIN = '/',
  AUTH_LANDING_PAGE = '/auth-callback',
}

export const App = () => {
  const { isAuthorized, authCancelled } = useStore(AppCondition);
  useEffect(() => {
    if (isAuthorized) {
      fetchUserData('');
    }
  }, [isAuthorized]);
  useEffect(() => {
    if (authCancelled) {
      errorParsingHOF(1);
    }
  }, [authCancelled]);
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
