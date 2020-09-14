import { UserDataDomain } from './domain';
import {
  editCurrentUserDataField,
  editUserData,
  fetchUserData,
  editMoneyCount,
  setUserSessionSocket,
  editUserProperty,
  getAccountData,
  resetUserDataStore,
  getUserName,
} from './events';
import Centrifuge from 'centrifuge';
import { birthdayParserToJSON } from '../../utils/birthday-parser';
import { setVolume } from '../settings/events';
import { SettingsType } from '../settings/store';

export enum UserDataStoreKeys {
  ID = 'id',
  NAME = 'name',
  WORLD_NAME = 'worldName',
  ASSISTANT_NAME = 'assistantName',
  BIRTHDAY = 'birthday',
  MONEY = 'money',
  COUPONS_COUNT = 'couponsCount',
  USER_SESSION_SOCKET = 'userSessionSocket',
  ENERGY = 'energy',
  AVATAR = 'avatar',
  MSISDN = 'msisdn',
  GUID = 'guid',
  FRESH_PROGRESS_TIME_OUT = 'freshProgressTimeout',
  SHOW_SLIDER = 'showSlider',
  SHOW_TUTORIAL = 'showTutorial',
  OPERATOR_ID = 'operatorId',
  IS_LOGGED_IN = 'isLoggedIn',
}

export const defaultNameValue = 'Мир клиента';

const initState: IUserDataStore = {
  [UserDataStoreKeys.ID]: 0,
  [UserDataStoreKeys.NAME]: defaultNameValue,
  [UserDataStoreKeys.WORLD_NAME]: defaultNameValue,
  [UserDataStoreKeys.ASSISTANT_NAME]: defaultNameValue,
  [UserDataStoreKeys.MONEY]: 0,
  [UserDataStoreKeys.ENERGY]: 0,
  [UserDataStoreKeys.BIRTHDAY]: { dd: '00', mm: '00' },
  [UserDataStoreKeys.COUPONS_COUNT]: 2,
  [UserDataStoreKeys.USER_SESSION_SOCKET]: null,
  [UserDataStoreKeys.AVATAR]: null,
  [UserDataStoreKeys.MSISDN]: null,
  [UserDataStoreKeys.GUID]: null,
  [UserDataStoreKeys.FRESH_PROGRESS_TIME_OUT]: 0,
  [UserDataStoreKeys.SHOW_SLIDER]: false,
  [UserDataStoreKeys.SHOW_TUTORIAL]: true,
  [UserDataStoreKeys.OPERATOR_ID]: null,
  [UserDataStoreKeys.IS_LOGGED_IN]: false,
};

export const UserDataStore = UserDataDomain.store<IUserDataStore>(initState)
  .on(getAccountData, (state, payload) => ({
    ...state,
    money: payload,
  }))
  .on(editMoneyCount, (state, payload) => ({
    ...state,
    money: payload,
  }))
  .on(editUserProperty, (state, { money, energy }) => ({
    ...state,
    money: state.money + money,
    energy: state.energy + energy,
  }))
  .on(editCurrentUserDataField, (state, { key, value }) => ({
    ...state,
    [key]: value,
  }))
  .on(
    fetchUserData.doneData,
    (
      state,
      {
        worldName,
        assistantName,
        name,
        id,
        birthday = '',
        avatar,
        msisdn,
        guid,
        freshProgressTimeout,
        musicValue,
        soundValue,
        showSlider,
        showTutorial,
        operatorId,
      }
    ) => {
      setVolume({ settingType: SettingsType.MUSIC, volume: musicValue });
      setVolume({ settingType: SettingsType.SOUND, volume: soundValue });
      return {
        ...state,
        id,
        worldName: worldName || defaultNameValue,
        assistantName: assistantName || defaultNameValue,
        name: name || defaultNameValue,
        birthday: birthdayParserToJSON(birthday),
        avatar,
        msisdn,
        guid,
        freshProgressTimeout,
        showSlider,
        showTutorial,
        operatorId,
      };
    }
  )
  .on(getUserName.doneData, (state, { name }) => ({
    ...state,
    name: name || defaultNameValue,
  }))
  .on(setUserSessionSocket, (state, payload) => ({
    ...state,
    userSessionSocket: payload,
  }))
  .on(editUserData, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .reset(resetUserDataStore);

export interface IUserDataStore {
  [UserDataStoreKeys.ID]: number;
  [UserDataStoreKeys.NAME]: string;
  [UserDataStoreKeys.WORLD_NAME]: string;
  [UserDataStoreKeys.ASSISTANT_NAME]: string;
  [UserDataStoreKeys.MONEY]: number;
  [UserDataStoreKeys.ENERGY]: number;
  [UserDataStoreKeys.COUPONS_COUNT]: number;
  [UserDataStoreKeys.BIRTHDAY]: IBirthday;
  [UserDataStoreKeys.COUPONS_COUNT]: number;
  [UserDataStoreKeys.USER_SESSION_SOCKET]: Centrifuge | null;
  [UserDataStoreKeys.AVATAR]: string | null;
  [UserDataStoreKeys.MSISDN]: string | null;
  [UserDataStoreKeys.GUID]: string | null;
  [UserDataStoreKeys.FRESH_PROGRESS_TIME_OUT]: number;
  [UserDataStoreKeys.SHOW_SLIDER]: boolean;
  [UserDataStoreKeys.SHOW_TUTORIAL]: boolean;
  [UserDataStoreKeys.OPERATOR_ID]: number | null;
  [UserDataStoreKeys.IS_LOGGED_IN]: boolean;
}

export interface IBirthday {
  dd: string;
  mm: string;
}
