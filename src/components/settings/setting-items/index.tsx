import React from 'react';
import { SettingsStore, SettingsType } from '../../../effector/settings/store';
import styled from 'styled-components';

import {
  musicAndSoundToggle,
  setVolume,
} from '../../../effector/settings/events';
import { useStore } from 'effector-react';
import { Icon } from '../../../UI/icons';

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

export const SettingItems = () => {
  const { music, sound } = useStore(SettingsStore);

  const changeHandler = (
    settingType: SettingsType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVolume({ settingType, volume: Number(e.target.value) });
    if (Number(e.target.value) === 0) {
      musicAndSoundToggle({
        settingType,
        enable: false,
      });
    } else {
      musicAndSoundToggle({
        settingType,
        enable: true,
      });
    }
  };
  return (
    <SettingItemsWrapper>
      <InputBody>
        <Icon
          style={styledConfig.icon}
          type={
            music.enable ? SettingsType.MUSIC : SettingsType.MUSIC + 'disable'
          }
          callBack={() =>
            musicAndSoundToggle({
              settingType: SettingsType.MUSIC,
              enable: !music.enable,
            })
          }
        />
        <InputRange
          value={music.volume}
          onChange={e => changeHandler(SettingsType.MUSIC, e)}
        />
      </InputBody>
      <InputBody>
        <Icon
          style={styledConfig.icon}
          type={
            sound.enable ? SettingsType.SOUND : SettingsType.SOUND + 'disable'
          }
          callBack={() =>
            musicAndSoundToggle({
              settingType: SettingsType.SOUND,
              enable: !sound.enable,
            })
          }
        />
        <InputRange
          value={sound.volume}
          onChange={e => changeHandler(SettingsType.SOUND, e)}
        />
      </InputBody>
    </SettingItemsWrapper>
  );
};
