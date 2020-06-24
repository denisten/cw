import React from 'react';
import styled from 'styled-components';
import {
  SettingsType,
  NotificationType,
  LanguageType,
} from '../../../effector/settings/store';
import { NotificationSettingWindow } from './notification-setting-window';
import { IDisplayFlag } from '../../skip-tutorial';
import { LanguageSettingWindow } from './language-setting-window';

const SettingsPopUpWrapper = styled.div<IDisplayFlag>`
  width: 300px;
  height: auto;
  background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  margin-bottom: 15px;
  display: ${props => (props.displayFlag ? 'flex' : 'none')};
  flex-direction: column;
`;

export const popUpSettingItemsTranslate: popUpSettingItemsTranslateType = {
  [NotificationType.TASKS]: 'Задания',
  [NotificationType.BUILDING]: 'Здания',
  [NotificationType.OTHER]: 'Другое',
  [LanguageType.RU]: 'Русский',
  [LanguageType.ENG]: 'Английский',
};

export const SettingsRow = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 30px 0px 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 14px;
    line-height: 20px;
    color: #02adc9;
  }

  &:last-child {
    padding-bottom: 30px;
  }

  &:first-child {
    padding-top: 30px;
  }
`;

export const SettingsPopUp: React.FC<ISettingsPopUp> = ({
  settingPopUpType,
}) => {
  return (
    <>
      <SettingsPopUpWrapper
        displayFlag={settingPopUpType === SettingsType.NOTIFICATION}
      >
        <NotificationSettingWindow />
      </SettingsPopUpWrapper>
      <SettingsPopUpWrapper
        displayFlag={settingPopUpType === SettingsType.LANGUAGE}
      >
        <LanguageSettingWindow />
      </SettingsPopUpWrapper>
    </>
  );
};

interface ISettingsPopUp {
  settingPopUpType: SettingsType | '';
}

type popUpSettingItemsTranslateType = {
  [key in NotificationType | LanguageType]: string;
};
