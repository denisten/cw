import React from 'react';
import styled from 'styled-components';
import { ExitButton } from '../../UI/exit-button';
import { taskModalWindowClosed } from '../../effector/app-condition/events';
import { ModalWindowProps } from '../extra-tower-info-modal-window';
import modalWindowImg from './background.png';
import { ImgWrapper } from '../../UI/img-wrapper';

enum marginRightValues {
  OPENED = 0,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  CLOSED = -100,
}

const TaskModalWindowWrapper = styled.div<ModalWindowProps>`
  position: absolute;
  z-index: 1;
  right: 0;
  margin-right: ${props =>
    !props.opened ? marginRightValues.CLOSED : marginRightValues.OPENED}%;
  transition-duration: 0.5s;
  transition-property: margin-right;
  height: 50%;
  //width: null;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: green;
`;

const StyleConfig = {
  exitButton: {
    height: 3,
    left: 1,
    top: 1,
    hoverFlag: true,
  },
  backgroundImg: {
    height: 100,
  },
};

export const TaskModalWindow: React.FC<ModalWindowProps> = ({ opened }) => {
  return (
    <TaskModalWindowWrapper opened={opened}>
      <ImgWrapper src={modalWindowImg} {...StyleConfig.backgroundImg} />
      <ExitButton
        {...StyleConfig.exitButton}
        callBack={() => taskModalWindowClosed()}
      />
      modal i find
    </TaskModalWindowWrapper>
  );
};
