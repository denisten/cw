import { ErrorBoundaryStore } from '../../effector/error-boundary-store/store';
import { resetErrorStore } from '../../effector/error-boundary-store/events';
import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Overlay } from '../../UI/overlay';
import background from './background.png';
import { CustomButton } from '../../UI/button';

const ErrorBody = styled.div`
  width: 617px;
  height: 683px;
  background: url(${background}) no-repeat center;
  background-size: 100% 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 174px 0 104px 0;
  box-sizing: border-box;
`;

const ErrorText = styled.span`
  color: #146977;
  font-size: 30.5px;
  font-weight: bold;
  max-width: 503px;
  height: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
`;

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
  const closeErrorPopup = () => {
    resetErrorStore();
  };

  return (
    <Overlay displayFlag={errorFlag} {...StyledConfig.overlay}>
      <ErrorBody>
        <ErrorText>{text}</ErrorText>

        <CustomButton
          callback={closeErrorPopup}
          {...StyledConfig.closeButton}
        />
      </ErrorBody>
    </Overlay>
  );
};
interface IOverLay {
  open: boolean;
}
