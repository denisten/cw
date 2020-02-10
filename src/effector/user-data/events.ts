import { UserDataDomain } from './domain';

export const editUserName = UserDataDomain.event<string>();
export const editUserSurname = UserDataDomain.event<string>();
export const editUserCityName = UserDataDomain.event<string>();
export const editUserNickname = UserDataDomain.event<string>();
