import { SettingsDomain } from './domain';
import { SettingsType, NotificationType, LanguageType } from './store';

export const musicAndSoundToggle = SettingsDomain.event<IMusicAndSoundToggle>();
export const setNotificationSetting = SettingsDomain.event<
  ISetNotificationSetting
>();
export const languageToggle = SettingsDomain.event<LanguageType>();

interface IMusicAndSoundToggle {
  settingType: SettingsType.MUSIC | SettingsType.SOUND;
  flag: boolean;
}
interface ISetNotificationSetting {
  notificationType: NotificationType;
  flag: boolean;
}
