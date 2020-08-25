import React from 'react';
import { SettingsStore, SettingsType } from '../../../effector/settings/store';
import styled from 'styled-components';

import { musicAndSoundToggle } from '../../../effector/settings/events';
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

const InputRange = styled.input.attrs({ type: 'range', min: 0, max: 100 })`
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
  return (
    <SettingItemsWrapper>
      <InputBody>
        <Icon
          style={styledConfig.icon}
          type={music ? SettingsType.MUSIC : SettingsType.MUSIC + 'disable'}
          callBack={() =>
            musicAndSoundToggle({
              settingType: SettingsType.MUSIC,
              flag: !music,
            })
          }
        />
        <InputRange />
      </InputBody>
      <InputBody>
        <Icon
          style={styledConfig.icon}
          type={sound ? SettingsType.SOUND : SettingsType.SOUND + 'disable'}
          callBack={() =>
            musicAndSoundToggle({
              settingType: SettingsType.SOUND,
              flag: !sound,
            })
          }
        />
        <InputRange />
      </InputBody>
    </SettingItemsWrapper>
  );
};

interface IOption {
  active: boolean;
  type: SettingsType;
}
