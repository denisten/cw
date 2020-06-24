import { SettingsDomain } from './domain';
import { SettingsType, NotificationType } from './store';

export const musicAndSoundToggle = SettingsDomain.event<IMusicAndSoundToggle>();
export const setNotificationSetting = SettingsDomain.event<
  ISetNotificationSetting
>();

interface IMusicAndSoundToggle {
  settingType: SettingsType.MUSIC | SettingsType.SOUND;
  flag: boolean;
}
interface ISetNotificationSetting {
  notificationType: NotificationType;
  flag: boolean;
}
