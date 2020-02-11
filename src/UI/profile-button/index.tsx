import React from 'react';
import profileImg from './button_nickname.png';
import { profileInfoModalWindowOpened } from '../../effector/app-condition/events';
import { ImgWrapper } from '../../UI/img-wrapper';
import styled from 'styled-components';

type NickNameWrapperProps = {
  nickName: string;
};

type MoneyCounterWrapperProps = {
  money: number;
};

const NickNameWrapper = styled.span<NickNameWrapperProps>`
  color: #fff;
  position: absolute;
  top: 18%;
  left: 27%;
  font-size: 1.5em;
  &:after {
    content: "${props => props.nickName}";
  }
`;

const MoneyCounterWrapper = styled.span<MoneyCounterWrapperProps>`
    color: #fff;
    position: absolute;
    top: 43%;
    left: 36%;
    font-size: 1.5em;
    &:after {
      content: "${props => props.money}"
    }
`;

const StyleConfig = {
  height: '10.1%',
  zIndex: 10,
  top: 3.7,
  left: 3.2,
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
    >
      <NickNameWrapper nickName="NickName" />
      <MoneyCounterWrapper money={228} />
    </ImgWrapper>
  );
};
