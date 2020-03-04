import { ErrorBoundaryStore } from '../../effector/error-boundary-store/store';
import { resetErrorStore } from '../../effector/error-boundary-store/events';
import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { ExitButton } from '../../UI/exit-button';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Overlay } from '../../UI/overlay';

const ErrorBody = styled.div`
  width: 600px;
  height: 600px;
  background-color: gray;
  position: relative;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 24px;
`;

const StyledConfig = {
  closeButton: {
    height: '28px',
    top: 1,
    right: 1,
    hoverFlag: true,
  },
  overlay: {
    zIndex: ZIndexes.ERROR,
  },
};

export const ErrorBoundary = () => {
  const { errorFlag, text } = useStore(ErrorBoundaryStore);
  const closeErrorPopup = () => {
    resetErrorStore();
  };
  return (
    <>
      <Overlay displayFlag={errorFlag} {...StyledConfig.overlay}>
        <ErrorBody>
          <ErrorText>{text}</ErrorText>
          <ExitButton
            {...StyledConfig.closeButton}
            callBack={closeErrorPopup}
          />
        </ErrorBody>
      </Overlay>
    </>
  );
};
interface IOverLay {
  open: boolean;
}
