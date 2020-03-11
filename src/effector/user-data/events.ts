import { UserDataDomain } from './domain';
import { UserDataStoreKeys } from './store';
import { getProfile, IGetProfile } from '../../api/get-profile';

export const editUserData = UserDataDomain.event<IEditUserData>();
export const saveUserDataAfterAuth = UserDataDomain.event<IGetProfile>();
export const fetchUserData = UserDataDomain.effect('fetch after auth', {
  handler: async () => {
    return await getProfile();
  },
});

interface IEditUserData {
  key: UserDataStoreKeys;
  value: string;
}
