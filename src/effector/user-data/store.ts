import { UserDataDomain } from './domain';
import {
  editCurrentUserDataField,
  editUserData,
  fetchUserData,
  saveUserDataAfterAuth,
  addMoney,
  setUserSessionSocket,
} from './events';
import connectLocalStorage from 'effector-localstorage/sync';
import Centrifuge from 'centrifuge';

export enum UserDataStoreKeys {
  ID = 'id',
  NAME = 'name',
  WORLD_NAME = 'worldName',
  ASSISTANT_NAME = 'assistantName',
  BIRTHDAY = 'birthday',
  MONEY = 'money',
  COINS = 'coins',
  COUPONS_COUNT = 'couponsCount',
  USER_SESSION_SOCKET = 'userSessionSocket',
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
  userSessionSocket: null,
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
  [UserDataStoreKeys.USER_SESSION_SOCKET]: initData.userSessionSocket,
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
  .on(setUserSessionSocket, (state, payload) => ({
    ...state,
    userSessionSocket: payload,
  }))
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
  [UserDataStoreKeys.COUPONS_COUNT]: number;
  [UserDataStoreKeys.BIRTHDAY]: IBirthday;
  [UserDataStoreKeys.COUPONS_COUNT]: number;
  [UserDataStoreKeys.USER_SESSION_SOCKET]: Centrifuge | null;
}

export interface IBirthday {
  dd: string;
  mm: string;
}
