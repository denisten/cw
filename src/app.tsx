import React, { useEffect } from 'react';
import { Route, Router, Switch } from 'react-router';
import { RootComponent } from './components/root-component';
import history from './history';
import { AuthLandingPage } from './components/auth-landing-page';
import { GlobalStyle } from './global-style';
import { ErrorBoundary } from './components/error-boundary';
import { Preloader } from './components/preloader';
import { useCheckUserAuthStatus } from './hooks/use-check-user-auth-status';
import TagManager from 'react-gtm-module';
import { isIE, isMobile } from 'react-device-detect';
import { Plug } from './components/plug';

export enum Routes {
  MAIN = '/',
  AUTH_LANDING_PAGE = '/auth-callback',
  PLUG = '/plug',
}

enum EventCodes {
  PLUS = 61,
  MINUS = 173,
  STRING_PLUS = '=',
  STRING_MINUS = '-',
}

export const App: React.FC = () => {
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

  useCheckUserAuthStatus();
  useEffect(() => {
    window.addEventListener('wheel', wheelPreventDefault, { passive: false });
    window.addEventListener('keydown', keyDownPreventDefault, {
      passive: false,
    });
    if (isMobile || isIE) history.push(Routes.PLUG);
    return () => {
      window.removeEventListener('wheel', wheelPreventDefault);
      window.removeEventListener('keydown', keyDownPreventDefault);
    };
  }, []);

  useEffect(() => {
    const tagManagerArgs = {
      gtmId: 'GTM-KML5W55',
    };
    TagManager.initialize(tagManagerArgs);
  }, []);

  const displayFlag = !(isMobile || isIE);
  return (
    <Router history={history}>
      <Preloader displayFlag={displayFlag} />
      <ErrorBoundary />
      <GlobalStyle />
      <Switch>
        <Route exact path={Routes.MAIN} component={RootComponent} />
        <Route path={Routes.AUTH_LANDING_PAGE} component={AuthLandingPage} />
        <Route path={Routes.PLUG} component={Plug} />
      </Switch>
    </Router>
  );
};
