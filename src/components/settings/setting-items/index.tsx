import React from 'react';
import { SettingsStore, SettingsType } from '../../../effector/settings/store';
import styled from 'styled-components';
import notification from './notification.svg';
import notificationActive from './notification-active.svg';
import sound from './sound.svg';
import soundActive from './sound-active.svg';
import music from './music.svg';
import musicActive from './music-active.svg';
import language from './language.svg';
import languageActive from './language-active.svg';
import { toggleMusic, toggleSound } from '../../../effector/settings/events';
import { useStore } from 'effector-react';

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
}) => {
  const { music, sound } = useStore(SettingsStore);
  return (
    <>
      {Object.values(SettingsType).map((elem, ind) => {
        switch (elem) {
          case SettingsType.NOTIFICATION:
          case SettingsType.LANGUAGE:
            return (
              <Option
                key={ind}
                active={selectOptionPopUpType === elem}
                onClick={() => callback(elem)}
                type={elem}
              />
            );
          case SettingsType.SOUND:
            return (
              <Option
                key={ind}
                active={sound}
                type={elem}
                onClick={() => toggleSound(!sound)}
              />
            );
          case SettingsType.MUSIC:
            return (
              <Option
                key={ind}
                active={music}
                type={elem}
                onClick={() => toggleMusic(!music)}
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
}

interface IOption {
  active: boolean;
  type: SettingsType;
}
