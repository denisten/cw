import { UserDataDomain } from './domain';
import {
  editUserData,
  saveUserDataAfterAuth,
  saveUserDataFromBackend,
} from './events';
import connectLocalStorage from 'effector-localstorage/sync';

export enum UserDataStoreKeys {
  NICKNAME = 'nickName',
  CITY_NAME = 'cityName',
  SUPPORT_NAME = 'supportName',
  MONEY = 'money',
}

export type UserDataStoreType = {
  [UserDataStoreKeys.NICKNAME]: string;
  [UserDataStoreKeys.CITY_NAME]: string;
  [UserDataStoreKeys.SUPPORT_NAME]: string;
  [UserDataStoreKeys.MONEY]: number;
};

const initState: UserDataStoreType = {
  [UserDataStoreKeys.NICKNAME]: '',
  [UserDataStoreKeys.CITY_NAME]: '',
  [UserDataStoreKeys.SUPPORT_NAME]: '',
  [UserDataStoreKeys.MONEY]: 228,
};

const userDataStoreLocalStorage = connectLocalStorage('UserData').onChange(
  saveUserDataAfterAuth
);

export const UserDataStore = UserDataDomain.store<UserDataStoreType>(initState)
  .on(editUserData, (state, { key, value }) => ({
    ...state,
    [key]: value,
  }))
  .on(saveUserDataFromBackend, (state, { supportName, cityName, nickName }) => {
    return {
      ...state,
      supportName: supportName || 'suppName',
      cityName: cityName || 'citynm',
      nickName: nickName || 'nickName',
    };
  });

UserDataStore.watch(userDataStoreLocalStorage);
