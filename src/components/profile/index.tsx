import React from 'react';
import avatarImg from '../../img/avatars/1-1.png';
import { useStore } from 'effector-react';
import { UserDataStore } from '../../effector/user-data/store';
import styled from 'styled-components';
import { MoneyWrapper } from '../../UI/money-wrapper';
import { DataInput } from '../../UI/data-input';
import {
  editUserName,
  editUserSurname,
  updateUserCityName,
} from '../../effector/user-data/events';
import { CustomButton } from '../../UI/button';

const NickNameWrapper = styled.span`
  font-size: 3em;
  color: #1b4f75;
  font-weight: 900;
`;

const UserInfoBlockWrapper = styled.div`
  width: 80%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const TitleWrapper = styled.div<TitleWrapperProps>`
  font-size: ${props => props.fontSize}em;
  color: #1b4f75;
  font-weight: bold;
  position: ${props => props.position || 'static'};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  bottom: ${props => props.bottom}%;
  right: ${props => props.right}%;
  width: ${props => props.width}%;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 90%;
`;
const InputsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  height: 54%;
  width: 60%;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  height: 28%;
`;

const ProfileHeaderUserData = styled.div`
  margin-left: 5%;
`;

const AccountData = styled.div`
  display: flex;
  justify-content: inherit;
  align-items: center;
  width: 86%;
`;

const PhoneWrapper = styled.div`
  margin-top: 4%;
  width: max-content;
`;

const StyledConfig = {
  avatar: {
    height: '80%',
  },
  titleWrapperInfo: {
    position: 'relative',
    left: 10,
    width: 100,
  },
  titleWrapperPhone: {
    width: 38,
  },
  button: {
    width: 24,
    height: 50,
    content: 'Выйти',
  },
};

type TitleWrapperProps = {
  fontSize: number;
  position?: string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  width?: number;
};
export const Profile = () => {
  const localUserData = useStore(UserDataStore);
  return (
    <ProfileWrapper>
      <ProfileHeader>
        <img src={avatarImg} {...StyledConfig.avatar} alt="profile" />
        <ProfileHeaderUserData>
          <NickNameWrapper> {localUserData.nickName}</NickNameWrapper>
          <MoneyWrapper count={localUserData.money} />
        </ProfileHeaderUserData>
      </ProfileHeader>
      <UserInfoBlockWrapper>
        <TitleWrapper {...StyledConfig.titleWrapperInfo} fontSize={1.8}>
          Информация
        </TitleWrapper>
        <InputsWrapper>
          <DataInput
            title="Имя"
            value={localUserData.name}
            callBack={name => editUserName(name)}
          />
          <DataInput
            title="Фамилия"
            value={localUserData.surname}
            callBack={name => editUserSurname(name)}
          />
          <DataInput
            title="Название города"
            value={localUserData.cityName}
            callBack={name => updateUserCityName(name)}
          />
        </InputsWrapper>

        <TitleWrapper {...StyledConfig.titleWrapperInfo} fontSize={1.8}>
          Аккаунт
        </TitleWrapper>
        <AccountData>
          <TitleWrapper {...StyledConfig.titleWrapperPhone} fontSize={1.8}>
            Телефон
            <PhoneWrapper>{localUserData.phoneNumber}</PhoneWrapper>
          </TitleWrapper>
          <CustomButton {...StyledConfig.button} />
        </AccountData>
      </UserInfoBlockWrapper>
    </ProfileWrapper>
  );
};
