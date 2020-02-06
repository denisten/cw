import React from 'react';
import { AvatarWrapper } from '../../UI/avatar-wrapper';
import avatarImg from '../../img/avatars/1-1.png';
import { useStore } from 'effector-react';
import { UserDataStore } from '../../effector/user-data/store';
import styled from 'styled-components';
import { MoneyWrapper } from '../../UI/money-wrapper';
import { DataInput } from '../../UI/data-input';

const NickNameWrapper = styled.span`
  position: absolute;
  left: 58%;
  transform: translate(-50%, 50%);
  font-size: 3em;
  color: #1b4f75;
  font-weight: 900;
`;

const UserInfoBlockWrapper = styled.div`
  width: 90%;
  height: 43%;
  position: absolute;
  top: 20%;
  left: 5%;
`;

const TitleWrapper = styled.span<TitleWrapperProps>`
  font-size: ${props => props.fontSize}em;
  color: #1b4f75;
  font-weight: bold;
`;

const StyledConfig = {
  avatar: {
    height: '13%',
    top: 4.7,
    left: 36.8,
  },
};

type TitleWrapperProps = {
  fontSize: number;
};
export const Profile = () => {
  const localUserData = useStore(UserDataStore);
  return (
    <div>
      <AvatarWrapper src={avatarImg} {...StyledConfig.avatar} />
      <NickNameWrapper> {localUserData.nickName}</NickNameWrapper>
      <MoneyWrapper count={localUserData.money} />
      <UserInfoBlockWrapper>
        <TitleWrapper fontSize={1.8}>Информация</TitleWrapper>
        <br />
        <br />
        <TitleWrapper fontSize={1.4}>Имя</TitleWrapper>
        <DataInput value={localUserData.name} />
      </UserInfoBlockWrapper>
    </div>
  );
};
