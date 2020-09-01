import { SettingsDomain } from './domain';
import { SettingsType } from './store';

export const setVolume = SettingsDomain.event<ISetVolume>();

interface ISetVolume {
  settingType: SettingsType;
  volume: number;
}
