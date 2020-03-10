import { UserDataDomain } from './domain';
import { editUserData, fetchUserData, saveUserDataAfterAuth } from './events';
import connectLocalStorage from 'effector-localstorage/sync';

export enum UserDataStoreKeys {
  NAME = 'name',
  WORLD_NAME = 'worldName',
  ASSISTANT_NAME = 'assistantName',
  MONEY = 'money',
}

export type UserDataStoreType = {
  [UserDataStoreKeys.NAME]: string;
  [UserDataStoreKeys.WORLD_NAME]: string;
  [UserDataStoreKeys.ASSISTANT_NAME]: string;
  [UserDataStoreKeys.MONEY]: number;
};

const initState: UserDataStoreType = {
  [UserDataStoreKeys.NAME]: '',
  [UserDataStoreKeys.WORLD_NAME]: '',
  [UserDataStoreKeys.ASSISTANT_NAME]: '',
  [UserDataStoreKeys.MONEY]: 113,
};

const userDataStoreLocalStorage = connectLocalStorage('UserData').onChange(
  saveUserDataAfterAuth
);

export const UserDataStore = UserDataDomain.store<UserDataStoreType>(initState)
  .on(editUserData, (state, { key, value }) => ({
    ...state,
    [key]: value,
  }))
  .on(fetchUserData.done, (state, { result: { data } }) => ({
    ...state,
    ...data,
  }));

UserDataStore.watch(userDataStoreLocalStorage);
