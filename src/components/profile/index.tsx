import React from 'react';
import { AvatarWrapper } from '../../UI/avatar-wrapper';
import avatarImg from '../../img/avatars/1-1.png';
import { useStore } from 'effector-react';
import { UserDataStore } from '../../effector/user-data/store';
import styled from 'styled-components';
import { MoneyWrapper } from '../../UI/money-wrapper';
import { DataInput } from '../../UI/data-input';
import { updateUserName } from '../../effector/user-data/events';
import { CustomButton } from '../../UI/button';

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
  height: 70%;
  position: absolute;
  top: 26%;
  left: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid;
`;

const TitleWrapper = styled.span<TitleWrapperProps>`
  font-size: ${props => props.fontSize}em;
  color: #1b4f75;
  font-weight: bold;
  position: ${props => props.position || 'static'};
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  bottom: ${props => props.bottom}%;
  right: ${props => props.right}%;
`;

const ProfileWrapper = styled.div``;
const InputsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  height: 54%;
`;

const StyledConfig = {
  avatar: {
    height: '13%',
    top: 4.7,
    left: 36.8,
  },
  titleWrapperInfo: {
    position: 'relative',
    left: -5,
  },
  titleWrapperPhone: {
    position: 'relative',
    left: 0,
  },
  titleWrapperAccount: {
    position: 'relative',
    left: -8,
  },
  button: {
    position: 'relative',
    bottom: 10,
    left: 26,
  },
};

type TitleWrapperProps = {
  fontSize: number;
  position?: string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};
export const Profile = () => {
  const localUserData = useStore(UserDataStore);
  return (
    <ProfileWrapper>
      <AvatarWrapper src={avatarImg} {...StyledConfig.avatar} />
      <NickNameWrapper> {localUserData.nickName}</NickNameWrapper>
      <MoneyWrapper count={localUserData.money} />
      <UserInfoBlockWrapper>
        <TitleWrapper {...StyledConfig.titleWrapperInfo} fontSize={1.8}>
          Информация
        </TitleWrapper>
        <InputsWrapper>
          <DataInput
            title="Имя"
            value={localUserData.name}
            callBack={name => updateUserName(name)}
          />
          <DataInput
            title="Фамилия"
            value={localUserData.surname}
            callBack={name => updateUserName(name)}
          />
          <DataInput
            title="Название города"
            value={localUserData.cityName}
            callBack={name => updateUserName(name)}
          />
        </InputsWrapper>

        <TitleWrapper {...StyledConfig.titleWrapperAccount} fontSize={1.8}>
          Аккаунт
        </TitleWrapper>
        <TitleWrapper {...StyledConfig.titleWrapperPhone} fontSize={1.8}>
          Телефон
          <br />
          <div style={{ marginTop: '4%' }}>{localUserData.phoneNumber}</div>
        </TitleWrapper>
        <CustomButton {...StyledConfig.button} />
      </UserInfoBlockWrapper>
    </ProfileWrapper>
  );
};
