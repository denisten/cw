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
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ErrorText = styled.span`
  color: #146977;
  font-size: 30.5px;
  font-weight: bold;
  max-width: 503px;
  margin-top: 174px;
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
    margin: '50px 0 0px 0',
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
