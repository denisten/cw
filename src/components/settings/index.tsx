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
import { ButtonClassNames, Button } from '../../UI/button';
import {
  Billet,
  RowWrapper,
  ITitleWrapper,
  ProfileHeaderDataWrapper,
} from '../profile';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import { nextTutorStep } from '../../effector/tutorial-store/events';
import { menuClosed } from '../../effector/app-condition/events';

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
  editButton: {
    width: 250,
    height: 52,
    content: 'Редактировать',
    fontSize: 25.5,
  },
  saveButton: {
    width: 201,
    height: 52,
    content: 'Сохранить',
    fontSize: 28.5,
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
  const { worldName, money, name } = useStore(UserDataStore);
  const { tutorialCondition } = useStore(TutorialStore);

  const [editMode, setEditMode] = useState(false);
  const toggleInputEdit = () => {
    if (
      tutorialCondition === TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME ||
      tutorialCondition === TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME
    )
      nextTutorStep();
    setEditMode(!editMode);
  };

  return (
    <ProfileWrapper>
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
            <Button
              className={ButtonClassNames.OUTLINE_NORMAL}
              animFlag={
                tutorialCondition ===
                TutorialConditions.PULSE_EDIT_CHANGE_CITY_NAME
              }
              callback={() => toggleInputEdit()}
              {...StyledConfig.editButton}
            />
          ) : null}
        </RowWrapper>
        <InputsWrapper>
          <DataInput
            editMode={editMode}
            title="Название города"
            key={worldName}
            value={worldName}
            callBack={value =>
              editUserData({ key: UserDataStoreKeys.WORLD_NAME, value })
            }
          />
        </InputsWrapper>
        {editMode ? (
          <RowWrapper {...StyledConfig.inEditModeRow}>
            <Button
              className={ButtonClassNames.OUTLINE_NORMAL}
              animFlag={
                tutorialCondition ===
                TutorialConditions.PULSE_SAVE_CHANGE_CITY_NAME
              }
              callback={() => {
                toggleInputEdit();
                menuClosed();
              }}
              {...StyledConfig.saveButton}
            />
          </RowWrapper>
        ) : null}
      </UserInfoBlockWrapper>
    </ProfileWrapper>
  );
};
