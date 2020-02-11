import { UserDataDomain } from './domain';
import { UserDataStoreKeys } from './store';

export const editUserData = UserDataDomain.event<editUserDataType>();

type editUserDataType = {
  key: UserDataStoreKeys;
  value: string;
};
