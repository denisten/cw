import React, { useEffect, useState } from 'react';
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
import { Preloader } from './components/preloader';

export enum Routes {
  MAIN = '/',
  AUTH_LANDING_PAGE = '/auth-callback',
}

enum EventCodes {
  PLUS = 61,
  MINUS = 173,
  STRING_PLUS = '=',
  STRING_MINUS = '-',
}

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
      (e.keyCode === EventCodes.PLUS ||
        e.keyCode === EventCodes.MINUS ||
        e.key === EventCodes.STRING_MINUS ||
        e.key === EventCodes.STRING_PLUS)
    ) {
      e.preventDefault();
    }
  };

  const [documentLoadedFlag, setDocumentLoadedFlag] = useState(false);
  const showContent = () => {
    setTimeout(() => {
      setDocumentLoadedFlag(true);
    }, 1000);
  };
  useEffect(() => {
    window.addEventListener('wheel', wheelPreventDefault, { passive: false });
    window.addEventListener('keydown', keyDownPreventDefault, {
      passive: false,
    });
    window.addEventListener('load', showContent);
    return () => {
      window.removeEventListener('wheel', wheelPreventDefault);
      window.removeEventListener('keydown', keyDownPreventDefault);
    };
  }, []);

  return (
    <Router history={history}>
      {!documentLoadedFlag ? <Preloader /> : null}
      <ErrorBoundary />
      <GlobalStyle />
      <Switch>
        <Route exact path={Routes.MAIN} component={RootComponent} />
        <Route path={Routes.AUTH_LANDING_PAGE} component={AuthLandingPage} />
      </Switch>
    </Router>
  );
};
