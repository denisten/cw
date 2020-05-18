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
  ID = 'id',
  NAME = 'name',
  WORLD_NAME = 'worldName',
  ASSISTANT_NAME = 'assistantName',
  BIRTHDAY = 'birthday',
  MONEY = 'money',
  COINS = 'coins',
  COUPONS_COUNT = 'couponsCount',
}

const initData = {
  id: 0,
  name: 'Неизвестно',
  worldName: 'Неизвестно',
  assistantName: 'Неизвестно',
  money: 200,
  coins: 299,
  birthday: {
    dd: '00',
    mm: '00',
  },
  couponsCount: 2,
};

const initState: IUserDataStore = {
  [UserDataStoreKeys.ID]: initData.id,
  [UserDataStoreKeys.NAME]: initData.name,
  [UserDataStoreKeys.WORLD_NAME]: initData.worldName,
  [UserDataStoreKeys.ASSISTANT_NAME]: initData.assistantName,
  [UserDataStoreKeys.MONEY]: initData.money,
  [UserDataStoreKeys.COINS]: initData.coins,
  [UserDataStoreKeys.BIRTHDAY]: initData.birthday,
  [UserDataStoreKeys.COUPONS_COUNT]: initData.couponsCount,
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
    (state, { result: { worldName, assistantName, name, id } }) => ({
      ...state,
      id,
      worldName: worldName || initData.worldName,
      assistantName: assistantName || initData.assistantName,
      name: name || initData.name,
    })
  )
  .on(editUserData, (state, payload) => ({
    ...state,
    ...payload,
  }));

UserDataStore.watch(userDataStoreLocalStorage);

export interface IUserDataStore {
  [UserDataStoreKeys.ID]: number;
  [UserDataStoreKeys.NAME]: string;
  [UserDataStoreKeys.WORLD_NAME]: string;
  [UserDataStoreKeys.ASSISTANT_NAME]: string;
  [UserDataStoreKeys.MONEY]: number;
  [UserDataStoreKeys.COINS]: number;
  [UserDataStoreKeys.BIRTHDAY]: IBirthday;
  [UserDataStoreKeys.COUPONS_COUNT]: number;
}

export interface IBirthday {
  dd: string;
  mm: string;
}
