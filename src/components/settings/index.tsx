import React, { useState } from 'react';
import avatarImg from '../../img/avatars/1-1.png';
import { useStore } from 'effector-react';
import {
  UserDataStore,
  UserDataStoreKeys,
} from '../../effector/user-data/store';
import styled from 'styled-components';
import { DataInput } from '../../UI/data-input';
import { editUserData } from '../../effector/user-data/events';
import { MoneyWrapper } from '../../UI/money-wrapper';
import { CustomButton } from '../../UI/button';
import { Billet, RowWrapper, TitleWrapperProps } from '../profile';
import {
  AppCondition,
  TutorialConditions,
} from '../../effector/app-condition/store';
import { nextTutorStep } from '../../effector/app-condition/events';

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

const StyledConfig = {
  avatar: {
    height: '133px',
    border: 'solid 2px #ffffff',
  },
  titleWrapperInfo: {
    fontSize: 1.8,
    margin: '0 30px 0 0',
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
  userInfoRow: {
    paddingLeft: '50px',
    margin: '0 0 30px 0',
  },
  inEditModeRow: {
    paddingLeft: '238px',
  },
};
const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Settings = () => {
  const localUserData = useStore(UserDataStore);
  const { tutorialCondition } = useStore(AppCondition);

  const [editMode, setEditMode] = useState(false);
  const toggleInputEdit = () => {
    if (
      tutorialCondition === TutorialConditions.CHANGE_CITY_NAME_ARROW ||
      tutorialCondition === TutorialConditions.SAVE_CITY_NAME_ARROW
    )
      nextTutorStep();
    setEditMode(!editMode);
  };

  return (
    <ProfileWrapper>
      <Billet />
      <ProfileHeader>
        <img src={avatarImg} {...StyledConfig.avatar} alt="profile" />
        <div>
          <DataInput
            {...StyledConfig.nickNameWrapper}
            key={localUserData.nickName}
            value={localUserData.nickName}
            callBack={value =>
              editUserData({ key: UserDataStoreKeys.NICKNAME, value })
            }
          />
          <MoneyWrapper count={localUserData.money} />
        </div>
      </ProfileHeader>
      <UserInfoBlockWrapper>
        <RowWrapper {...StyledConfig.userInfoRow}>
          <TitleWrapper {...StyledConfig.titleWrapperInfo}>
            Информация
          </TitleWrapper>
          {!editMode ? (
            <CustomButton
              pulseAnim={
                tutorialCondition === TutorialConditions.CHANGE_CITY_NAME_ARROW
              }
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
              pulseAnim={
                tutorialCondition === TutorialConditions.SAVE_CITY_NAME_ARROW
              }
              callback={() => toggleInputEdit()}
              {...StyledConfig.saveButton}
            />
          </RowWrapper>
        ) : null}
      </UserInfoBlockWrapper>
    </ProfileWrapper>
  );
};
