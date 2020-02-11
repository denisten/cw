import { UserDataDomain } from './domain';
import { editUserData } from './events';

export enum UserDataStoreKeys {
  NICKNAME = 'nickName',
  NAME = 'name',
  SURNAME = 'surname',
  CITY_NAME = 'cityName',
  PHONE_NUMBER = 'phoneNumber',
  MONEY = 'money',
}

export type UserDataStoreType = {
  [UserDataStoreKeys.NICKNAME]: string;
  [UserDataStoreKeys.NAME]: string;
  [UserDataStoreKeys.SURNAME]: string;
  [UserDataStoreKeys.CITY_NAME]: string;
  [UserDataStoreKeys.PHONE_NUMBER]: string;
  [UserDataStoreKeys.MONEY]: number;
};

const initState: UserDataStoreType = {
  [UserDataStoreKeys.NICKNAME]: 'NameName',
  [UserDataStoreKeys.NAME]: 'Init name',
  [UserDataStoreKeys.SURNAME]: 'Иванов',
  [UserDataStoreKeys.CITY_NAME]: 'LA',
  [UserDataStoreKeys.PHONE_NUMBER]: '8-800-555-35-35',
  [UserDataStoreKeys.MONEY]: 2900,
};

export const UserDataStore = UserDataDomain.store<UserDataStoreType>(
  initState
).on(editUserData, (state, { key, value }) => ({
  ...state,
  [key]: value,
}));
