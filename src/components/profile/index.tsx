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
import { AppCondition } from '../../effector/app-condition/store';
import { CookieService } from '../../sevices/cookies';
import { handleAuthButtonClick } from '../../utils/handle-auth-button-click';
import { logout } from '../../api';
import { updateUserData } from '../../api/update-user-data';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import { turnOffTutorialMode } from '../../effector/tutorial-store/events';

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
  },
  nickNameWrapper: {
    title: '',
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

const UserInfoBlockWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const TitleWrapper = styled.div<ITitleWrapper>`
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

const NonAuthorizedPanel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RowWrapper = styled.div<IRowWrapper>`
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

export const ProfileHeaderDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2.2vh;
  margin: 0 10%;
`;

export const Profile = React.memo(() => {
  const { name, assistantName, worldName, money } = useStore(UserDataStore);
  const [editMode, setEditMode] = useState(false);
  const { isAuthorized } = useStore(AppCondition);
  const { tutorialCondition } = useStore(TutorialStore);
  const toggleInputEdit = () => setEditMode(!editMode);
  return (
    <ProfileWrapper>
      {isAuthorized ? (
        <React.Fragment>
          <Billet />
          <ProfileHeader>
            <img src={avatarImg} {...StyledConfig.avatar} alt="profile" />
            <ProfileHeaderDataWrapper>
              <p>{name}</p>
              <MoneyWrapper count={money} />
            </ProfileHeaderDataWrapper>
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
                key="Никнейм"
                value={name}
                callBack={value =>
                  editUserData({ key: UserDataStoreKeys.NAME, value })
                }
              />
              <DataInput
                editMode={editMode}
                title="Имя помощника"
                key="Имя помощника"
                value={assistantName}
                callBack={value =>
                  editUserData({ key: UserDataStoreKeys.ASSISTANT_NAME, value })
                }
              />
              <DataInput
                editMode={editMode}
                title="Название города"
                key="Название города"
                value={worldName}
                callBack={value =>
                  editUserData({ key: UserDataStoreKeys.WORLD_NAME, value })
                }
              />
            </InputsWrapper>
            {editMode ? (
              <RowWrapper {...StyledConfig.inEditModeRow}>
                <CustomButton
                  callback={() => {
                    toggleInputEdit();
                    updateUserData({ name, assistantName, worldName });
                  }}
                  {...StyledConfig.saveButton}
                />
              </RowWrapper>
            ) : null}

            {!editMode ? (
              <RowWrapper {...StyledConfig.inEditModeRow}>
                <CustomButton
                  callback={() => {
                    CookieService.resetToken();
                    logout();
                  }}
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
            animFlag={
              tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON
            }
            callback={() => {
              if (tutorialCondition === TutorialConditions.PULSE_AUTH_BUTTON)
                turnOffTutorialMode();
              handleAuthButtonClick();
            }}
            {...StyledConfig.enterButton}
          />
        </NonAuthorizedPanel>
      )}
    </ProfileWrapper>
  );
});

export interface ITitleWrapper {
  fontSize: number;
  position?: string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  width?: number;
  margin?: string;
}

interface IRowWrapper {
  display?: string;
  paddingLeft?: string;
  margin?: string;
}
