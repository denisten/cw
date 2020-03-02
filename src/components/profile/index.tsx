import React, { useState } from 'react';
import avatarImg from '../../img/avatars/1-1.png';
import { useStore } from 'effector-react';
import {
  UserDataStore,
  UserDataStoreKeys,
} from '../../effector/user-data/store';
import styled from 'styled-components';
import { MoneyWrapper } from '../../UI/money-wrapper';
import { DataInput } from '../../UI/data-input';
import { editUserData } from '../../effector/user-data/events';
import { CustomButton } from '../../UI/button';
import {
  AppCondition,
  TutorialConditions,
} from '../../effector/app-condition/store';
import { handleAuthButtonClick } from '../../utils/handle-auth-button-click';
import { CookieService } from '../../sevices/cookies';
import { turnOffTutorialMode } from '../../effector/app-condition/events';

const UserInfoBlockWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  margin: ${props => props.margin};
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const InputsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  width: 60%;
  padding-left: 72px;
  box-sizing: border-box;
`;

const ProfileHeader = styled.div`
  display: flex;
  position: absolute;
  top: -20px;
  left: 34px;
`;

export const ProfileHeaderUserData = styled.div``;

const StyledConfig = {
  nonAuthorizedAvatar: {
    width: '140px',
    height: '149px',
    marginBottom: '5%',
  },
  avatar: {
    height: '133px',
    border: 'solid 2px #ffffff',
  },
  titleWrapperInfo: {
    fontSize: 1.8,
    margin: '0 30px 0 0',
  },
  titleWrapperPhone: {
    width: 38,
    fontSize: 1.8,
  },
  button: {
    width: '201px',
    height: '52px',
    content: 'Выйти',
    fontSize: '28.5px',
  },
  enterButton: {
    width: '201px',
    height: '52px',
    content: 'Войти',
    fontSize: '28.5px',
    margin: '0 0 30px 0',
    pulseAnim: false,
  },
  nickNameWrapper: {
    title: '',
    minWidth: 170,
    fontSize: '2',
    color: 'white',
    margin: '35px 0px 0 0',
  },
  editButton: {
    width: '250px',
    height: '52px',
    content: 'Редактировать',
    fontSize: '25.5px',
  },
  saveButton: {
    width: '201px',
    height: '52px',
    content: 'Сохранить',
    fontSize: '28.5px',
    margin: '115px 0 0 0',
  },
  exitButton: {
    width: '201px',
    height: '52px',
    content: 'Выйти',
    fontSize: '28.5px',
    margin: '115px 0 0 0',
  },
  userInfoRow: {
    paddingLeft: '50px',
    margin: '0 0 30px 0',
  },
  inEditModeRow: {
    paddingLeft: '238px',
  },
};

export type TitleWrapperProps = {
  fontSize: number;
  position?: string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  width?: number;
  margin?: string;
};

type RowWrapperType = {
  display?: string;
  paddingLeft?: string;
  margin?: string;
};

const NonAuthorizedPanel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RowWrapper = styled.div<RowWrapperType>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: ${props => props.paddingLeft || '0px'};
  margin: ${props => props.margin || '0px'};
  min-height: 52px;
`;

export const Billet = styled.div`
  width: 487px;
  height: 123px;
  background-color: #01acc8;
  clip-path: polygon(
    30% 0%,
    70% 0%,
    100% 0,
    100% 0%,
    80% 100%,
    30% 100%,
    0 100%,
    0 0
  );
  margin-bottom: 27px;
`;

export const Profile = () => {
  const localUserData = useStore(UserDataStore);
  const [editMode, setEditMode] = useState(false);
  const toggleInputEdit = () => setEditMode(!editMode);

  const { isAuthorized, tutorialCondition } = useStore(AppCondition);
  return (
    <ProfileWrapper>
      {!isAuthorized ? (
        <React.Fragment>
          <Billet />
          <ProfileHeader>
            <img src={avatarImg} {...StyledConfig.avatar} alt="profile" />
            <ProfileHeaderUserData>
              <DataInput
                {...StyledConfig.nickNameWrapper}
                key={localUserData.nickName}
                value={localUserData.nickName}
                callBack={value =>
                  editUserData({ key: UserDataStoreKeys.NICKNAME, value })
                }
              />
              <MoneyWrapper count={localUserData.money} />
            </ProfileHeaderUserData>
          </ProfileHeader>
          <UserInfoBlockWrapper>
            <RowWrapper {...StyledConfig.userInfoRow}>
              <TitleWrapper {...StyledConfig.titleWrapperInfo}>
                Информация
              </TitleWrapper>
              {!editMode ? (
                <CustomButton
                  callback={() => toggleInputEdit()}
                  {...StyledConfig.editButton}
                />
              ) : null}
            </RowWrapper>
            <InputsWrapper>
              <DataInput
                editMode={editMode}
                title="Никнейм"
                key={localUserData.name}
                value={localUserData.name}
                callBack={value =>
                  editUserData({ key: UserDataStoreKeys.NAME, value })
                }
              />
              <DataInput
                editMode={editMode}
                title="Имя помощника"
                key={localUserData.surname}
                value={localUserData.surname}
                callBack={value =>
                  editUserData({ key: UserDataStoreKeys.SURNAME, value })
                }
              />
              <DataInput
                editMode={editMode}
                title="Название города"
                key={localUserData.cityName}
                value={localUserData.cityName}
                callBack={value =>
                  editUserData({ key: UserDataStoreKeys.CITY_NAME, value })
                }
              />
            </InputsWrapper>
            {editMode ? (
              <RowWrapper {...StyledConfig.inEditModeRow}>
                <CustomButton
                  callback={() => toggleInputEdit()}
                  {...StyledConfig.saveButton}
                />
              </RowWrapper>
            ) : null}

            {!editMode ? (
              <RowWrapper {...StyledConfig.inEditModeRow}>
                <CustomButton
                  callback={() => CookieService.resetToken()}
                  {...StyledConfig.exitButton}
                />
              </RowWrapper>
            ) : null}
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
            callback={() => {
              if (tutorialCondition === TutorialConditions.AUTH_ARROW)
                turnOffTutorialMode();
              handleAuthButtonClick();
            }}
            {...StyledConfig.enterButton}
          />
        </NonAuthorizedPanel>
      )}
    </ProfileWrapper>
  );
};
