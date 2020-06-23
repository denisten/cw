import { SettingsDomain } from './domain';

export enum SettingsType {
  NOTIFICATION = 'notification',
  SOUND = 'sound',
  MUSIC = 'music',
  LANGUAGE = 'language',
}

export enum NotificationType {
  TASKS = 'tasks',
  BUILDING = 'building',
  OTHER = 'other',
}

export enum LanguageType {
  RU = 'ru',
  ENG = 'eng',
}

const initState = {
  [SettingsType.NOTIFICATION]: {
    [NotificationType.TASKS]: { select: true },
    [NotificationType.BUILDING]: { select: false },
    [NotificationType.OTHER]: { select: true },
  },
  [SettingsType.MUSIC]: true,
  [SettingsType.SOUND]: false,
  [SettingsType.LANGUAGE]: LanguageType.RU,
};

export const SettingsStore = SettingsDomain.store<ISettingStore>(initState);

export interface ISettingStore {
  [SettingsType.NOTIFICATION]: {
    [key in NotificationType]: { select: boolean };
  };
  [SettingsType.MUSIC]: boolean;
  [SettingsType.SOUND]: boolean;
  [SettingsType.LANGUAGE]: LanguageType;
}
