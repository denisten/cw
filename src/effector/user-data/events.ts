import { UserDataDomain } from './domain';
import { UserDataStoreKeys } from './store';

export const editUserData = UserDataDomain.event<IEditUserData>();
export const saveUserDataAfterAuth = UserDataDomain.event<
  ISaveUserDataFromBackend
>();
export const saveUserDataFromBackend = UserDataDomain.event<
  ISaveUserDataFromBackend
>();

interface IEditUserData {
  key: UserDataStoreKeys;
  value: string;
}

export interface ISaveUserDataFromBackend {
  nickName: string;
  supportName: string;
  cityName: string;
}
