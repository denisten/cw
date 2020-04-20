import { UserDataDomain } from './domain';
import {
  editCurrentUserDataField,
  editUserData,
  fetchUserData,
  saveUserDataAfterAuth,
  addMoney,
} from './events';
import connectLocalStorage from 'effector-localstorage/sync';

export enum UserDataStoreKeys {
  NAME = 'name',
  WORLD_NAME = 'worldName',
  ASSISTANT_NAME = 'assistantName',
  BIRTHDAY = 'birthday',
  MONEY = 'money',
  COINS = 'coins',
}

const initState: IUserDataStore = {
  [UserDataStoreKeys.NAME]: 'Василий',
  [UserDataStoreKeys.WORLD_NAME]: 'Мой Мир',
  [UserDataStoreKeys.ASSISTANT_NAME]: 'Генадий',
  [UserDataStoreKeys.MONEY]: 200000,
  [UserDataStoreKeys.COINS]: 300000,
  [UserDataStoreKeys.BIRTHDAY]: {
    dd: '',
    mm: '',
  },
};

const userDataStoreLocalStorage = connectLocalStorage('UserData').onChange(
  saveUserDataAfterAuth
);

export const UserDataStore = UserDataDomain.store<IUserDataStore>(initState)
  .on(addMoney, (state, payload) => ({
    ...state,
    money: state.money + payload,
  }))
  .on(editCurrentUserDataField, (state, { key, value }) => ({
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
  )
  .on(editUserData, (state, payload) => ({
    ...state,
    ...payload,
  }));

UserDataStore.watch(userDataStoreLocalStorage);

export interface IUserDataStore {
  [UserDataStoreKeys.NAME]: string;
  [UserDataStoreKeys.WORLD_NAME]: string;
  [UserDataStoreKeys.ASSISTANT_NAME]: string;
  [UserDataStoreKeys.MONEY]: number;
  [UserDataStoreKeys.COINS]: number;
  [UserDataStoreKeys.BIRTHDAY]: IBirthday;
}

export interface IBirthday {
  dd: string;
  mm: string;
}
