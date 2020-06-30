import { UserDataDomain } from './domain';
import { IBirthday, UserDataStoreKeys } from './store';
import { getProfile, IGetProfile } from '../../api/get-profile';
import Centrifuge from 'centrifuge';
import { devLoginRequest } from '../../api/dev-api/login';
import { getAccount } from '../../api/get-account';
import { logoutRequest } from '../../api';
import { editIsAuthorizedFlag, setDataReceived } from '../app-condition/events';
import { resetMissionsStore } from '../missions-store/events';
import { resetTaskMessagesStore } from '../chat-messages/events';
import { resetTowersMarker } from '../towers-marker/events';
import { resetTowerProgress } from '../towers-progress/events';

export const editCurrentUserDataField = UserDataDomain.event<
  IEditCurrentUserDataField
>();
export const editUserData = UserDataDomain.event<IEditUserData>();
export const saveUserDataAfterAuth = UserDataDomain.event<IGetProfile>();
export const fetchUserData = UserDataDomain.effect('fetch after auth', {
  handler: async () => {
    return await getProfile();
  },
});

export const getUserName = UserDataDomain.effect('fetch after auth', {
  handler: async () => {
    return await getProfile();
  },
});

export const resetUserDataStore = UserDataDomain.event('reset user data');
export const devLogin = UserDataDomain.effect('dev login for users', {
  handler: async (phone: string) => {
    return await devLoginRequest(phone);
  },
});

export const logout = UserDataDomain.effect('logout', {
  handler: async () => {
    await logoutRequest();
    editIsAuthorizedFlag(false);
    resetMissionsStore();
    resetTaskMessagesStore();
    resetTowersMarker();
    resetTowerProgress();
    setDataReceived(false);
    return resetUserDataStore();
  },
});

export const getAccountData = UserDataDomain.effect('fetch balance', {
  handler: async () => {
    return await getAccount();
  },
});
export const editMoneyCount = UserDataDomain.event<number>();
export const editUserProperty = UserDataDomain.event<IEditUserProperty>();
export const setUserSessionSocket = UserDataDomain.event<Centrifuge>();

interface IEditCurrentUserDataField {
  key: UserDataStoreKeys;
  value: string;
}

export interface IEditUserData {
  name?: string;
  worldName?: string;
  assistantName?: string;
  birthday?: IBirthday;
}

export interface IEditUserProperty {
  money: number;
  energy: number;
}
