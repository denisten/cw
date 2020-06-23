import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { SettingsStore, SettingsType } from '../../effector/settings/store';
import notification from './notification.svg';
import notificationActive from './notification-active.svg';
import sound from './sound.svg';
import soundActive from './sound-active.svg';
import music from './music.svg';
import musicActive from './music-active.svg';
import language from './language.svg';
import languageActive from './language-active.svg';
import { musicAndSoundToggle } from '../../effector/settings/events';

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
  align-items: center;
`;

const SettingOptionsWrapper = styled.div`
  display: flex;
`;

const returnOptionBackground = (active: boolean, type: SettingsType) => {
  switch (type) {
    case SettingsType.NOTIFICATION:
      return active ? notificationActive : notification;
    case SettingsType.SOUND:
      return active ? soundActive : sound;
    case SettingsType.MUSIC:
      return active ? musicActive : music;
    case SettingsType.LANGUAGE:
      return active ? languageActive : language;

    default:
      break;
  }
};

const Option = styled.div<IOption>`
  width: 60px;
  height: 60px;
  background-size: 100% 100%;
  background: url(${props => returnOptionBackground(props.active, props.type)})
    no-repeat center;
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const SettingPopUp = styled.div`
  width: 300px;
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
  const settingsItemCreate = () => {
    const mainSetting = Object.values(SettingsType).map((elem, ind) => {
      switch (elem) {
        case SettingsType.NOTIFICATION:
          return (
            <Option
              key={ind}
              active={selectOptionPopUpType === SettingsType.NOTIFICATION}
              onClick={() => selectPopUpItem(SettingsType.NOTIFICATION)}
              type={elem}
            />
          );
        case SettingsType.SOUND:
          return (
            <Option
              key={ind}
              active={sound}
              type={elem}
              onClick={() =>
                musicAndSoundToggle({ settingType: elem, flag: !sound })
              }
            />
          );
        case SettingsType.MUSIC:
          return (
            <Option
              key={ind}
              active={music}
              type={elem}
              onClick={() =>
                musicAndSoundToggle({ settingType: elem, flag: !music })
              }
            />
          );
        case SettingsType.LANGUAGE:
          return (
            <Option
              key={ind}
              active={selectOptionPopUpType === SettingsType.LANGUAGE}
              onClick={() => selectPopUpItem(SettingsType.LANGUAGE)}
              type={elem}
            />
          );
        default:
          break;
      }
    });
    return mainSetting;
  };

  return (
    <SettingWrapper>
      <SettingPopUpWrapper></SettingPopUpWrapper>
      <SettingOptionsWrapper>{settingsItemCreate()}</SettingOptionsWrapper>
    </SettingWrapper>
  );
};

interface IOption {
  active: boolean;
  type: SettingsType;
}
