import React from 'react';
import profileImg from './profile-img.png';
import { profileInfoModalWindowOpened } from '../../effector/app-condition/events';
import { ImgWrapper } from '../../UI/img-wrapper';

const StyleConfig = {
  height: '8%',
  zIndex: 10,
  top: 5,
  left: 5,
  hoverFlag: true,
};

export const ProfileButton = () => {
  return (
    <ImgWrapper
      src={profileImg}
      callBack={() => {
        profileInfoModalWindowOpened();
      }}
      {...StyleConfig}
    />
  );
};
