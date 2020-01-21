import React from 'react';
import styled from 'styled-components';
import profileImg from './profile-img.png';
import { profileInfoModalWindowOpened } from '../../effector/app-condition/events';

const ProfileButtonWrapper = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${profileImg});
  background-size: contain;
  background-repeat: no-repeat;
  position: fixed;
  top: 2%;
  left: 2%;
  z-index: 10;
  &:hover {
    cursor: pointer;
  }
`;

export const ProfileButton = () => {
  return (
    <ProfileButtonWrapper
      onClick={() => {
        profileInfoModalWindowOpened();
      }}
    />
  );
};
