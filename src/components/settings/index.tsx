import React from 'react';
import avatarImg from '../../img/avatars/1-1.png';
import { useStore } from 'effector-react';
import {
  UserDataStoreKeys,
  UserDataStore,
} from '../../effector/user-data/store';
import styled from 'styled-components';
import { DataInput } from '../../UI/data-input';
import { editUserData } from '../../effector/user-data/events';
import { nextTutorStep } from '../../effector/app-condition/events';

const UserInfoBlockWrapper = styled.div`
  width: 100%;
  height: 72%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 54%;
  width: 60%;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: center;
  height: 28%;
`;

const StyledConfig = {
  avatar: {
    height: '80%',
  },
  titleWrapperInfo: {
    fontSize: 1.8,
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

export const Settings = () => {
  const localUserData = useStore(UserDataStore);
  return (
    <ProfileWrapper>
      <React.Fragment>
        <ProfileHeader>
          <img src={avatarImg} {...StyledConfig.avatar} alt="profile" />
        </ProfileHeader>
        <UserInfoBlockWrapper>
          <TitleWrapper {...StyledConfig.titleWrapperInfo}>
            Информация
          </TitleWrapper>
          <InputsWrapper>
            <DataInput
              title="Имя"
              key={2}
              value={localUserData.name}
              callBack={value =>
                editUserData({ key: UserDataStoreKeys.NAME, value })
              }
            />
            <DataInput
              title="Фамилия"
              key={3}
              value={localUserData.surname}
              callBack={value =>
                editUserData({ key: UserDataStoreKeys.SURNAME, value })
              }
            />
            <DataInput
              title="Название города"
              key={4}
              value={localUserData.cityName}
              callBack={value => {
                editUserData({ key: UserDataStoreKeys.CITY_NAME, value });
                nextTutorStep();
              }}
            />
          </InputsWrapper>
        </UserInfoBlockWrapper>
      </React.Fragment>
    </ProfileWrapper>
  );
};
