import { SettingsDomain } from './domain';
import { musicAndSoundToggle, setVolume } from './events';

export enum SettingsType {
  SOUND = 'sound',
  MUSIC = 'music',
}

const initState = {
  [SettingsType.MUSIC]: { enable: true, volume: 0.2 },
  [SettingsType.SOUND]: { enable: false, volume: 0.7 },
};

export const SettingsStore = SettingsDomain.store<ISettingStore>(initState)
  .on(musicAndSoundToggle, (state, { settingType, enable }) => ({
    ...state,
    [settingType]: { ...state[settingType], enable },
  }))
  .on(setVolume, (state, { settingType, volume }) => ({
    ...state,
    [settingType]: { ...state[settingType], volume },
  }));

export interface ISettingStore {
  [SettingsType.MUSIC]: { enable: boolean; volume: number };
  [SettingsType.SOUND]: { enable: boolean; volume: number };
}
