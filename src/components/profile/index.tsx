import React from 'react';
import avatarImg from '../../img/avatars/1-1.png';
import { useStore } from 'effector-react';
import {
  UserDataStoreKeys,
  UserDataStore,
} from '../../effector/user-data/store';
import styled from 'styled-components';
import { MoneyWrapper } from '../../UI/money-wrapper';
import { DataInput } from '../../UI/data-input';
import { editUserData } from '../../effector/user-data/events';
import { CustomButton } from '../../UI/button';
import { AppCondition } from '../../effector/app-condition/store';
import { handleAuthButtonClick } from '../../utils/handle-auth-button-click';

const UserInfoBlockWrapper = styled.div`
  width: 100%;
  height: 72%;
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
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  min-width: 27%;
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
  nonAuthorizedAvatar: {
    width: '140px',
    height: '149px',
    marginBottom: '5%',
  },
  avatar: {
    height: '80%',
  },
  titleWrapperInfo: {
    fontSize: 1.8,
  },
  titleWrapperPhone: {
    width: 38,
    fontSize: 1.8,
  },
  button: {
    width: '19%',
    height: '50%',
    content: 'Выйти',
  },
  enterButton: {
    width: '201px',
    height: '52px',
    content: 'Войти',
  },
  nickNameWrapper: {
    title: '',
    minWidth: 170,
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

const NonAuthorizedPanel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Profile = () => {
  const localUserData = useStore(UserDataStore);
  const { isAuthorized, tutorialCondition } = useStore(AppCondition);
  return (
    <ProfileWrapper>
      {isAuthorized ? (
        <React.Fragment>
          <ProfileHeader>
            <img src={avatarImg} {...StyledConfig.avatar} alt="profile" />
            <ProfileHeaderUserData>
              <DataInput
                {...StyledConfig.nickNameWrapper}
                key={1}
                value={localUserData.nickName}
                callBack={value =>
                  editUserData({ key: UserDataStoreKeys.NICKNAME, value })
                }
              />
              <MoneyWrapper count={localUserData.money} />
            </ProfileHeaderUserData>
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
                callBack={value =>
                  editUserData({ key: UserDataStoreKeys.CITY_NAME, value })
                }
              />
            </InputsWrapper>
            <TitleWrapper {...StyledConfig.titleWrapperInfo}>
              Аккаунт
            </TitleWrapper>
            <AccountData>
              <TitleWrapper {...StyledConfig.titleWrapperPhone}>
                Телефон
                <PhoneWrapper>{localUserData.phoneNumber}</PhoneWrapper>
              </TitleWrapper>
              <CustomButton
                callback={() => handleAuthButtonClick(false, tutorialCondition)}
                {...StyledConfig.button}
              />
            </AccountData>
          </UserInfoBlockWrapper>
        </React.Fragment>
      ) : (
        <NonAuthorizedPanel>
          <img
            src={avatarImg}
            style={{ ...StyledConfig.nonAuthorizedAvatar }}
            alt="profile"
          />
          <CustomButton
            callback={() => handleAuthButtonClick(true, tutorialCondition)}
            {...StyledConfig.enterButton}
          />
        </NonAuthorizedPanel>
      )}
    </ProfileWrapper>
  );
};
