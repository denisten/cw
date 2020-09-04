import React, { useRef, useEffect } from 'react';
import { SettingsStore, SettingsType } from '../../../effector/settings/store';
import styled from 'styled-components';

import { setVolume } from '../../../effector/settings/events';
import { useStore } from 'effector-react';
import { Icon } from '../../../UI/icons';
import _debounce from 'debounce';
import { saveUserData } from '../../../api/save-user-data';
import { reactGAEvent } from '../../../utils/ga-event';

const SettingItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputBody = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const InputRange = styled.input.attrs({
  type: 'range',
  min: 0,
  max: 1,
  step: 0.1,
})`
  width: 310px;
  margin-left: 20px;
`;

const styledConfig = {
  icon: {
    width: '24px',
    height: '24px',
  },
};
const delayBeforeSendRequest = 1000;
export const SettingItems = () => {
  const { music, sound } = useStore(SettingsStore);
  const musicInputRef = useRef<HTMLInputElement>(null);
  const soundInputRef = useRef<HTMLInputElement>(null);
  const saveData = (e: Event, fieldName: 'musicValue' | 'soundValue') => {
    const target = e.target as HTMLInputElement;
    const data = { [fieldName]: +target.value };
    saveUserData(data);
  };

  const changeHandler = (
    settingType: SettingsType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVolume({ settingType, volume: Number(e.target.value) });
  };

  useEffect(() => {
    if (musicInputRef.current) {
      musicInputRef.current.onchange = _debounce(
        (e: Event) => saveData(e, 'musicValue'),
        delayBeforeSendRequest
      );
    }
    if (soundInputRef.current) {
      soundInputRef.current.onchange = _debounce(
        (e: Event) => saveData(e, 'soundValue'),
        delayBeforeSendRequest
      );
    }
  }, []);
  return (
    <SettingItemsWrapper>
      <InputBody>
        <Icon
          style={styledConfig.icon}
          type={
            music.volume > 0
              ? SettingsType.MUSIC
              : SettingsType.MUSIC + 'disable'
          }
          callBack={() => {
            setVolume({ settingType: SettingsType.MUSIC, volume: 0 });
            saveUserData({ musicValue: 0 });
            reactGAEvent({
              eventLabel: 'muzika',
              eventCategory: 'nastroiki',
              eventContext: 'off',
            });
          }}
        />
        <InputRange
          ref={musicInputRef}
          value={music.volume}
          onChange={e => changeHandler(SettingsType.MUSIC, e)}
        />
      </InputBody>
      <InputBody>
        <Icon
          style={styledConfig.icon}
          type={
            sound.volume > 0
              ? SettingsType.SOUND
              : SettingsType.SOUND + 'disable'
          }
          callBack={() => {
            setVolume({ settingType: SettingsType.SOUND, volume: 0 });
            saveUserData({ soundValue: 0 });
            reactGAEvent({
              eventLabel: 'zvuk',
              eventCategory: 'nastroiki',
              eventContext: 'off',
            });
          }}
        />
        <InputRange
          ref={soundInputRef}
          value={sound.volume}
          onChange={e => changeHandler(SettingsType.SOUND, e)}
        />
      </InputBody>
    </SettingItemsWrapper>
  );
};
