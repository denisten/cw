import { UserDataDomain } from './domain';
import { getProfile } from '../../api/get-profile';
import Centrifuge from 'centrifuge';
import { devLoginRequest } from '../../api/dev-api/login';
import { logoutRequest } from '../../api';
import { editIsAuthorizedFlag, setDataReceived } from '../app-condition/events';
import { resetMissionsStore } from '../tasks-store/events';
import { resetChatStore } from '../chat/events';
import { resetTowersMarker } from '../towers-marker/events';
import { resetTowerProgress } from '../towers-progress/events';
import { resetUserShopStore } from '../coupons/events';
import { UserInfo } from './store';

export const editCurrentUserDataField = UserDataDomain.event<
  IEditCurrentUserDataField
>();
export const editUserData = UserDataDomain.event<IEditUserData>();
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
    resetChatStore();
    resetTowersMarker();
    resetTowerProgress();
    setDataReceived(false);
    resetUserShopStore();
    return resetUserDataStore();
  },
});

export const getAccountData = UserDataDomain.event<number>();
export const editMoneyCount = UserDataDomain.event<number>();
export const editUserProperty = UserDataDomain.event<IEditUserProperty>();
export const setUserSessionSocket = UserDataDomain.event<Centrifuge>();

interface IEditCurrentUserDataField {
  key: UserInfo;
  value: string;
}

export interface IEditUserData {
  name?: string;
  worldName?: string;
  assistantName?: string;
  isLoggedIn?: boolean;
}

export interface IEditUserProperty {
  money: number;
  energy: number;
}
