import { ErrorBoundaryStore } from '../../effector/error-boundary-store/store';
import {
  resetErrorStore,
  coughtError,
} from '../../effector/error-boundary-store/events';
import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { ButtonClassNames, Button } from '../../UI/button';
import { ErrorWrapper } from './error-wrapper';
import { errorCodes } from '../../utils/error-handler';
import { setCancelAuthorizationStatus } from '../../effector/app-condition/events';

const StyledConfig = {
  closeButton: {
    width: 200,
    height: 51,
    content: 'Ок',
    fontSize: 28.5,
  },
  overlay: {
    zIndex: ZIndexes.ERROR,
  },
};

enum NetworkStatuses {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export const ErrorBoundary = () => {
  const { errorFlag, text } = useStore(ErrorBoundaryStore);
  const [networkStatus, setNetworkStatus] = useState(NetworkStatuses.ONLINE);
  const closeErrorPopup = () => {
    resetErrorStore();
    setCancelAuthorizationStatus('');
  };

  const setNetworkStatusOffline = () => {
    setNetworkStatus(NetworkStatuses.OFFLINE);
    coughtError({
      text: errorCodes[0],
    });
  };

  const setNetworkStatusOnline = () => {
    setNetworkStatus(NetworkStatuses.ONLINE);
    resetErrorStore();
  };

  useEffect(() => {
    window.addEventListener('offline', setNetworkStatusOffline);
    window.addEventListener('online', setNetworkStatusOnline);
  }, []);
  return (
    <ErrorWrapper errorFlag={errorFlag} text={text} {...StyledConfig.overlay}>
      <Button
        displayFlag={networkStatus === NetworkStatuses.ONLINE}
        className={ButtonClassNames.OUTLINE_NORMAL}
        callback={closeErrorPopup}
        {...StyledConfig.closeButton}
      />
    </ErrorWrapper>
  );
};
