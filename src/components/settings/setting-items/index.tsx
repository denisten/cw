import React from 'react';
import { SettingsType } from '../../../effector/settings/store';
import styled from 'styled-components';
import notification from './notification.svg';
import notificationActive from './notification-active.svg';
import sound from './sound.svg';
import soundActive from './sound-active.svg';
import music from './music.svg';
import musicActive from './music-active.svg';
import language from './language.svg';
import languageActive from './language-active.svg';
import { musicAndSoundToggle } from '../../../effector/settings/events';

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
  cursor: pointer;
  transition: 0.4s;
`;

export const SettingItems: React.FC<ISettingItems> = ({
  callback,
  selectOptionPopUpType,
  soundState,
  musicState,
}) => {
  return (
    <>
      {Object.values(SettingsType).map((elem, ind) => {
        switch (elem) {
          case SettingsType.NOTIFICATION:
            return (
              <Option
                key={ind}
                active={selectOptionPopUpType === SettingsType.NOTIFICATION}
                onClick={() => callback(SettingsType.NOTIFICATION)}
                type={elem}
              />
            );
          case SettingsType.SOUND:
            return (
              <Option
                key={ind}
                active={soundState}
                type={elem}
                onClick={() =>
                  musicAndSoundToggle({ settingType: elem, flag: !soundState })
                }
              />
            );
          case SettingsType.MUSIC:
            return (
              <Option
                key={ind}
                active={musicState}
                type={elem}
                onClick={() =>
                  musicAndSoundToggle({ settingType: elem, flag: !musicState })
                }
              />
            );
          case SettingsType.LANGUAGE:
            return (
              <Option
                key={ind}
                active={selectOptionPopUpType === SettingsType.LANGUAGE}
                onClick={() => callback(SettingsType.LANGUAGE)}
                type={elem}
              />
            );
          default:
            break;
        }
      })}
    </>
  );
};

interface ISettingItems {
  callback: (elem: SettingsType) => void;
  selectOptionPopUpType: SettingsType | '';
  soundState: boolean;
  musicState: boolean;
}

interface IOption {
  active: boolean;
  type: SettingsType;
}
