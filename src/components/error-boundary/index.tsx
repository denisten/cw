import { ErrorBoundaryStore } from '../../effector/error-boundary-store/store';
import {
  resetErrorStore,
  coughtError,
} from '../../effector/error-boundary-store/events';
import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { CustomButton } from '../../UI/button';
import { ErrorWrapper } from './error-wrapper';
import { errorCodes } from '../../utils/error-handler';

const StyledConfig = {
  closeButton: {
    width: '200px',
    height: '51px',
    content: 'Ок',
    fontSize: '28.5px',
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
      {networkStatus === 'online' ? (
        <CustomButton
          callback={closeErrorPopup}
          {...StyledConfig.closeButton}
        />
      ) : null}
    </ErrorWrapper>
  );
};
