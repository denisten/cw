import { SettingsDomain } from './domain';
import { SettingsType } from './store';

export const musicAndSoundToggle = SettingsDomain.event<IMusicAndSoundToggle>();
export const setVolume = SettingsDomain.event<ISetVolume>();

interface IMusicAndSoundToggle {
  settingType: SettingsType;
  enable: boolean;
}

interface ISetVolume {
  settingType: SettingsType;
  volume: number;
}
