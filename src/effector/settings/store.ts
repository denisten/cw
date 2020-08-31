import { SettingsDomain } from './domain';
import { setVolume } from './events';

export enum SettingsType {
  SOUND = 'sound',
  MUSIC = 'music',
}

const initState = {
  [SettingsType.MUSIC]: { volume: 0.2 },
  [SettingsType.SOUND]: { volume: 0.7 },
};

export const SettingsStore = SettingsDomain.store<ISettingStore>(initState).on(
  setVolume,
  (state, { settingType, volume }) => ({
    ...state,
    [settingType]: { ...state[settingType], volume },
  })
);

export interface ISettingStore {
  [SettingsType.MUSIC]: { volume: number };
  [SettingsType.SOUND]: { volume: number };
}
