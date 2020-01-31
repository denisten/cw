import React from 'react';
import styled from 'styled-components';
import { ExitButton } from '../../UI/exit-button';
import { extraTowerInfoModalClosed } from '../../effector/app-condition/events';

export type ModalWindowProps = {
  opened?: boolean;
};

enum marginRightValues {
  OPENED = 0,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  CLOSED = -100,
}

export const ModalWindowWrapper = styled.div<ModalWindowProps>`
  position: absolute;
  z-index: 1;
  right: 0;
  width: 35%;
  height: 100%;
  background-color: green;
  margin-right: ${props =>
    !props.opened ? marginRightValues.CLOSED : marginRightValues.OPENED}%;
  transition-duration: 0.5s;
  transition-property: margin-right;
`;

const StyleConfig = {
  exitButton: {
    height: 3,
    top: 1,
    left: 1,
    hoverFlag: true,
  },
};

export const ModalWindow: React.FC<ModalWindowProps> = ({ opened }) => {
  return (
    <ModalWindowWrapper opened={opened}>
      <ExitButton
        {...StyleConfig.exitButton}
        callBack={() => extraTowerInfoModalClosed()}
      />
      hello
    </ModalWindowWrapper>
  );
};