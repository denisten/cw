import { UserDataDomain } from './domain';

type UserDataStoreType = {
  nickName: string;
  name: string;
  surname: string;
  cityName: string;
  phoneNumber: string;
  money: number;
};

const initState: UserDataStoreType = {
  nickName: 'Unknown',
  name: 'Init name',
  surname: 'Иванов',
  cityName: 'LA',
  phoneNumber: '8-800-555-35-35',
  money: 2900,
};

export const UserDataStore = UserDataDomain.store<UserDataStoreType>(initState);
