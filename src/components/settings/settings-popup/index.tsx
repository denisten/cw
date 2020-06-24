import React from 'react';
import styled from 'styled-components';
import { SettingsType } from '../../../effector/settings/store';
import { NotificationSettingWindow } from './notification-setting-window';

const SettingsPopUpWrapper = styled.div`
  width: 300px;
  height: auto;
  background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

export const SettingsPopUp: React.FC = () => {
  return (
    <SettingsPopUpWrapper>
      <NotificationSettingWindow />
    </SettingsPopUpWrapper>
  );
};

interface ISettingsPopUp {
  settingPopUpType: SettingsType | '';
}
