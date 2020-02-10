import { UserDataDomain } from './domain';

export const editUserName = UserDataDomain.event<string>();
export const editUserSurname = UserDataDomain.event<string>();
export const updateUserCityName = UserDataDomain.event<string>();
