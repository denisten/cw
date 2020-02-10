import { UserDataDomain } from './domain';
import {
  editUserName,
  editUserSurname,
  editUserCityName,
  editUserNickname,
} from './events';

type UserDataStoreType = {
  nickName: string;
  name: string;
  surname: string;
  cityName: string;
  phoneNumber: string;
  money: number;
};

const initState: UserDataStoreType = {
  nickName: 'NameName',
  name: 'Init name',
  surname: 'Иванов',
  cityName: 'LA',
  phoneNumber: '8-800-555-35-35',
  money: 2900,
};

export const UserDataStore = UserDataDomain.store<UserDataStoreType>(initState)
  .on(editUserName, (state, payload) => ({
    ...state,
    name: payload,
  }))
  .on(editUserSurname, (state, payload) => ({
    ...state,
    surname: payload,
  }))
  .on(editUserCityName, (state, payload) => ({
    ...state,
    cityName: payload,
  }))
  .on(editUserNickname, (state, payload) => ({
    ...state,
    nickName: payload,
  }));
