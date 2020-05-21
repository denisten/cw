import { UserDataDomain } from './domain';
import { IBirthday, UserDataStoreKeys } from './store';
import { getProfile, IGetProfile } from '../../api/get-profile';
import Centrifuge from 'centrifuge';

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
export const addMoney = UserDataDomain.event<number>();
export const setUserSessionSocket = UserDataDomain.event<Centrifuge>();

interface IEditCurrentUserDataField {
  key: UserDataStoreKeys;
  value: string;
}

interface IEditUserData {
  name?: string;
  worldName?: string;
  assistantName?: string;
  birthday?: IBirthday;
}
