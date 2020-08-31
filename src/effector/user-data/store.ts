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
  [UserDataStoreKeys.GUID]: '',
  [UserDataStoreKeys.FRESH_PROGRESS_TIME_OUT]: 0,
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
      }
    ) => ({
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
    })
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
  [UserDataStoreKeys.GUID]: string;
  [UserDataStoreKeys.FRESH_PROGRESS_TIME_OUT]: number;
}

export interface IBirthday {
  dd: string;
  mm: string;
}
