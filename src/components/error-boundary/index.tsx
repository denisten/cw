import { ErrorBoundaryStore } from '../../effector/error-boundary-store/store';
import { resetErrorStore } from '../../effector/error-boundary-store/events';
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

const OverLay = styled.div<IOverLay>`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: ${props => (props.open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: ${ZIndexes.ERROR};
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
};

export const ErrorBoundary = () => {
  const { errorFlag, text } = useStore(ErrorBoundaryStore);
  const closeErrorPopup = () => {
    resetErrorStore();
  };
  return (
    <>
      <OverLay open={errorFlag}>
        <ErrorBody>
          <ErrorText>{text}</ErrorText>
          <ExitButton
            {...StyledConfig.closeButton}
            callBack={closeErrorPopup}
          />
        </ErrorBody>
      </OverLay>
    </>
  );
};
interface IOverLay {
  open: boolean;
}
