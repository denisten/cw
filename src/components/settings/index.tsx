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

const SettingFooter = styled.div`
  box-sizing: border-box;
  margin-top: 71px;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    font-size: 14px;
    line-height: 20px;
    text-decoration-line: underline;
    color: #02adc9;
    margin-bottom: 10px;
  }

  span {
    font-size: 12px;
    line-height: 20px;
    color: #001424;
    opacity: 0.5;
  }
`;

export const Settings: React.FC = () => {
  const { sound, music } = useStore(SettingsStore);
  const [selectOptionPopUpType, setSelectOptionPopUpType] = useState<
    SettingsType | ''
  >('');

  const selectPopUpItem = (elem: SettingsType) => {
    if (selectOptionPopUpType === elem) {
      setSelectOptionPopUpType('');
    } else {
      setSelectOptionPopUpType(elem);
    }
  };

  return (
    <SettingWrapper>
      <SettingPopUpWrapper>
        <SettingsPopUp settingPopUpType={selectOptionPopUpType} />
      </SettingPopUpWrapper>
      <SettingOptionsWrapper>
        <SettingItems
          callback={selectPopUpItem}
          selectOptionPopUpType={selectOptionPopUpType}
          soundState={sound}
          musicState={music}
        />
      </SettingOptionsWrapper>
      <SettingFooter>
        <a
          target="_blank"
          href="https://moskva.mts.ru/personal"
          rel="noreferrer"
        >
          Условия пользования
        </a>
        <a
          target="_blank"
          href="https://moskva.mts.ru/personal"
          rel="noreferrer"
        >
          Политика конфидециальности
        </a>
        <span>Мир Клиента. Все права защищены. 2020.</span>
      </SettingFooter>
    </SettingWrapper>
  );
};
