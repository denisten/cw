import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { SettingsStore, SettingsType } from '../../effector/settings/store';
import { SettingItems } from './setting-items';
import { SettingsPopUp } from './settings-popup';

const SettingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SettingPopUpWrapper = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const SettingOptionsWrapper = styled.div`
  display: flex;
`;

export const Settings: React.FC = () => {
  const { sound, music } = useStore(SettingsStore);
  const [selectOptionPopUpType, setSelectOptionPopUpType] = useState<
    SettingsType | ''
  >('');
  // const { tasks, building, other } = notification;

  const selectPopUpItem = (elem: SettingsType) => {
    if (selectOptionPopUpType === elem) {
      setSelectOptionPopUpType('');
    } else {
      setSelectOptionPopUpType(elem);
    }
  };

  // console.log(notification, sound, music, language);

  return (
    <SettingWrapper>
      <SettingPopUpWrapper>
        <SettingsPopUp />
      </SettingPopUpWrapper>
      <SettingOptionsWrapper>
        <SettingItems
          callback={selectPopUpItem}
          selectOptionPopUpType={selectOptionPopUpType}
          soundState={sound}
          musicState={music}
        />
      </SettingOptionsWrapper>
    </SettingWrapper>
  );
};
