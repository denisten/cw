import React from 'react';
import { ExitButton } from '../../UI/exit-button';
import { profileInfoModalWindowClosed } from '../../effector/app-condition/events';
import { AuthButton } from '../auth-button';
import background from './background.png';
import { AvatarWrapper } from '../../UI/avatar-wrapper';
import avatarImg from '../../img/avatars/1-1.png';
import { ImgWrapper } from '../../UI/img-wrapper';
import { SaveButton } from '../../UI/save-button';

const StyledConfig = {
  exitButton: {
    height: 5,
    top: 1,
    right: 1,
    hoverFlag: true,
  },
  mainWrapper: {
    height: 80,
    zIndex: 20,
    top: 50,
    left: 50,
    transformTranslate: '-50%, -50%',
  },
  avatar: {
    height: 21,
    top: 2,
    left: 2,
  },
  saveButton: {
    height: 7,
    bottom: 0,
    left: 50,
    transformTranslate: '-50%, -50%',
    hoverFlag: true,
  },
};

export const ProfileModalWindow = () => {
  return (
    <ImgWrapper {...StyledConfig.mainWrapper} src={background}>
      <AvatarWrapper src={avatarImg} {...StyledConfig.avatar} />
      <AuthButton />
      <ExitButton
        {...StyledConfig.exitButton}
        callBack={() => profileInfoModalWindowClosed()}
      />
      <SaveButton
        {...StyledConfig.saveButton}
        callBack={() => {
          profileInfoModalWindowClosed();
        }}
      />
    </ImgWrapper>
  );
};
