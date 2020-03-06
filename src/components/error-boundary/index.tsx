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

export const ErrorBoundary = () => {
  const { errorFlag, text } = useStore(ErrorBoundaryStore);
  const [offlineState, setOfflineState] = useState(false);
  const closeErrorPopup = () => {
    resetErrorStore();
  };

  const offline = () => {
    setOfflineState(true);
    coughtError({
      text: errorCodes[0],
    });
  };

  const online = () => {
    setOfflineState(false);
    resetErrorStore();
  };

  useEffect(() => {
    window.addEventListener('offline', offline);
    window.addEventListener('online', online);
  }, []);

  return (
    <ErrorWrapper errorFlag={errorFlag} text={text} {...StyledConfig.overlay}>
      {!offlineState ? (
        <CustomButton
          callback={closeErrorPopup}
          {...StyledConfig.closeButton}
        />
      ) : null}
    </ErrorWrapper>
  );
};
