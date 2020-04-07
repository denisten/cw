import { UserDataDomain } from './domain';
import { editUserData, fetchUserData, saveUserDataAfterAuth } from './events';
import connectLocalStorage from 'effector-localstorage/sync';

export enum UserDataStoreKeys {
  NAME = 'name',
  WORLD_NAME = 'worldName',
  ASSISTANT_NAME = 'assistantName',
  MONEY = 'money',
  COINS = 'coins',
}

export type UserDataStoreType = {
  [UserDataStoreKeys.NAME]: string;
  [UserDataStoreKeys.WORLD_NAME]: string;
  [UserDataStoreKeys.ASSISTANT_NAME]: string;
  [UserDataStoreKeys.MONEY]: number;
  [UserDataStoreKeys.COINS]: number;
};

const initState: UserDataStoreType = {
  [UserDataStoreKeys.NAME]: '',
  [UserDataStoreKeys.WORLD_NAME]: '',
  [UserDataStoreKeys.ASSISTANT_NAME]: '',
  [UserDataStoreKeys.MONEY]: 200000,
  [UserDataStoreKeys.COINS]: 300000,
};

const userDataStoreLocalStorage = connectLocalStorage('UserData').onChange(
  saveUserDataAfterAuth
);

export const UserDataStore = UserDataDomain.store<UserDataStoreType>(initState)
  .on(editUserData, (state, { key, value }) => ({
    ...state,
    [key]: value,
  }))
  .on(
    fetchUserData.done,
    (state, { result: { worldName = '', assistantName = '', name = '' } }) => ({
      ...state,
      worldName,
      assistantName,
      name,
    })
  );

UserDataStore.watch(userDataStoreLocalStorage);
