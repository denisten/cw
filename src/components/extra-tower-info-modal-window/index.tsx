import React from 'react';
import styled from 'styled-components';
import { ExitButton } from '../../UI/close-button';
import { extraTowerInfoModalClosed } from '../../effector/app-condition/events';

const ModalWindowWrapper = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  width: 35%;
  height: 100%;
  background-color: green;
`;

const StyleConfig = {
  exitButton: {
    width: 5,
    height: 3,
    top: 1,
    left: 1,
  },
};

export const ModalWindow = (): React.ReactElement => {
  return (
    <ModalWindowWrapper>
      <ExitButton
        {...StyleConfig.exitButton}
        callBack={() => extraTowerInfoModalClosed()}
      />
      hello
    </ModalWindowWrapper>
  );
};
