import React from 'react';
import styled from 'styled-components';
import { ExitButton } from '../../UI/close-button';
import { profileInfoModalWindowClosed } from '../../effector/app-condition/events';
import { AuthButton } from '../auth-button';

const ProfileModalWindowWrapper = styled.div`
  width: 60%;
  height: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: aqua;
  z-index: 20;
`;

const StyledConfig = {
  exitButton: {
    width: 4,
    height: 4,
    top: 1,
    right: 1,
  },
};

export const ProfileModalWindow = () => {
  return (
    <ProfileModalWindowWrapper>
      <AuthButton />
      <ExitButton
        {...StyledConfig.exitButton}
        callBack={() => profileInfoModalWindowClosed()}
      />
    </ProfileModalWindowWrapper>
  );
};
