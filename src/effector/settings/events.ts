import { SettingsDomain } from './domain';
import { SettingsType } from './store';

export const musicAndSoundToggle = SettingsDomain.event<IMusicAndSoundToggle>();

interface IMusicAndSoundToggle {
  settingType: SettingsType.MUSIC | SettingsType.SOUND;
  flag: boolean;
}
