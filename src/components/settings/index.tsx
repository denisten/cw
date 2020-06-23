import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { SettingsStore, SettingsType } from '../../effector/settings/store';

const SettingWrapped = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SettingOptionsWrapper = styled.div`
  display: flex;
`;

const Option = styled.div<{ active: boolean }>`
  width: 60px;
  height: 60px;
  background-color: ${props => (props.active ? 'red' : 'green')};
  /* margin: 10px; */
  &:not(:last-child) {
    margin-right: 20px;
  }
  &[data-type=${SettingsType.NOTIFICATION}] {
      background: url();
  }
  &[data-type=${SettingsType.SOUND}] {
      background: url();
  }
  &[data-type=${SettingsType.MUSIC}] {
      background: url();
  }
  &[data-type=${SettingsType.LANGUAGE}] {
      background: url();
  }
`;

export const Settings: React.FC = () => {
  const { sound, music } = useStore(SettingsStore);
  const [selectOptionPopUpType, setSelectOptionPopUpType] = useState('');
  // const { tasks, building, other } = notification;

  const selectPopUpItem = (elem: SettingsType) => {
    if (selectOptionPopUpType === elem) {
      setSelectOptionPopUpType('');
    } else {
      setSelectOptionPopUpType(elem);
    }
  };

  // console.log(notification, sound, music, language);
  const settingsItemCreate = () => {
    const mainSetting = Object.values(SettingsType).map((elem, ind) => {
      switch (elem) {
        case SettingsType.NOTIFICATION:
          return (
            <Option
              key={ind}
              active={selectOptionPopUpType === SettingsType.NOTIFICATION}
              onClick={() => selectPopUpItem(SettingsType.NOTIFICATION)}
              data-type={elem}
            />
          );
        case SettingsType.SOUND:
          return <Option key={ind} active={sound} data-type={elem} />;
        case SettingsType.MUSIC:
          return <Option key={ind} active={music} data-type={elem} />;
        case SettingsType.LANGUAGE:
          return (
            <Option
              key={ind}
              active={selectOptionPopUpType === SettingsType.LANGUAGE}
              onClick={() => selectPopUpItem(SettingsType.LANGUAGE)}
              data-type={elem}
            />
          );
        default:
          break;
      }
    });
    return mainSetting;
  };

  return (
    <SettingWrapped>
      <SettingOptionsWrapper>{settingsItemCreate()}</SettingOptionsWrapper>
    </SettingWrapped>
  );
};
