import { UserDataDomain } from './domain';
import { UserDataStoreKeys } from './store';
import { getProfile, IGetProfile } from '../../api/get-profile';

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

interface IEditCurrentUserDataField {
  key: UserDataStoreKeys;
  value: string;
}

interface IEditUserData {
  name?: string;
  worldName?: string;
  assistantName?: string;
  birthday?: string;
}
