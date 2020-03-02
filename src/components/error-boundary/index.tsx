import { ErrorBoundaryStore } from '../../effector/error-boundary-store/store';
import {
  dispatchErrorEvent,
  dispatchClearErrorEvent,
} from '../../effector/error-boundary-store/events';
import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { ExitButton } from '../../UI/exit-button';
import { ZIndexes } from '../root-component/z-indexes-enum';

const ErrorBody = styled.div`
  width: 600px;
  height: 600px;
  background-color: gray;
  position: relative;
`;

const OverLay = styled.div<OverlayProps>`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: ${ZIndexes.modal};
`;

const ErrorText = styled.span`
  color: red;
  font-size: 24px;
`;

type OverlayProps = {
  open: boolean;
};

const StyledConfig = {
  closeButton: {
    height: '28px',
    top: 1,
    right: 1,
    hoverFlag: true,
  },
};

export const Errors = () => {
  const { errorFlag, text } = useStore(ErrorBoundaryStore);
  const closeErrorPopup = () => {
    dispatchClearErrorEvent();
  };
  return (
    <>
      <OverLay open={errorFlag}>
        <ErrorBody>
          <ErrorText>{text}</ErrorText>
          <ExitButton
            {...StyledConfig.closeButton}
            callBack={() => closeErrorPopup()}
          />
        </ErrorBody>
      </OverLay>
      <button
        onClick={() => dispatchErrorEvent({ errorFlag: true, text: 'asdf' })}
      >
        {errorFlag}
        <br />
        {text}
      </button>
    </>
  );
};
