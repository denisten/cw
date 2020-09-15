import { UserDataDomain } from './domain';
import {
  editCurrentUserDataField,
  editUserData,
  fetchUserData,
  editMoneyCount,
  setUserSessionSocket,
  editUserProperty,
  getAccountData,
  resetUserDataStore,
  getUserName,
} from './events';
import Centrifuge from 'centrifuge';
import { setVolume } from '../settings/events';
import { SettingsType } from '../settings/store';

export const defaultNameValue = 'Мир клиента';
export enum UserInfo {
  WORLD_NAME = 'worldName',
  ASSISTANT_NAME = 'assistantName',
  USER_NAME = 'name',
}
const initState: IUserDataStore = {
  id: 0,
  name: defaultNameValue,
  worldName: defaultNameValue,
  assistantName: defaultNameValue,
  money: 0,
  energy: 0,
  couponsCount: 2,
  userSessionSocket: null,
  avatar: null,
  msisdn: null,
  guid: null,
  freshProgressTimeout: 0,
  showSlider: false,
  showTutorial: true,
  operatorId: null,
  isLoggedIn: false,
};

export const UserDataStore = UserDataDomain.store<IUserDataStore>(initState)
  .on(getAccountData, (state, payload) => ({
    ...state,
    money: payload,
  }))
  .on(editMoneyCount, (state, payload) => ({
    ...state,
    money: payload,
  }))
  .on(editUserProperty, (state, { money, energy }) => ({
    ...state,
    money: state.money + money,
    energy: state.energy + energy,
  }))
  .on(editCurrentUserDataField, (state, { key, value }) => ({
    ...state,
    [key]: value,
  }))
  .on(
    fetchUserData.doneData,
    (
      state,
      {
        worldName,
        assistantName,
        name,
        id,
        avatar,
        msisdn,
        guid,
        freshProgressTimeout,
        musicValue,
        soundValue,
        showSlider,
        showTutorial,
        operatorId,
      }
    ) => {
      setVolume({ settingType: SettingsType.MUSIC, volume: musicValue });
      setVolume({ settingType: SettingsType.SOUND, volume: soundValue });
      return {
        ...state,
        id,
        worldName: worldName || defaultNameValue,
        assistantName: assistantName || defaultNameValue,
        name: name || defaultNameValue,
        avatar,
        msisdn,
        guid,
        freshProgressTimeout,
        showSlider,
        showTutorial,
        operatorId,
      };
    }
  )
  .on(getUserName.doneData, (state, { name }) => ({
    ...state,
    name: name || defaultNameValue,
  }))
  .on(setUserSessionSocket, (state, payload) => ({
    ...state,
    userSessionSocket: payload,
  }))
  .on(editUserData, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .reset(resetUserDataStore);
export interface IUserDataStore {
  id: number;
  [UserInfo.USER_NAME]: string;
  [UserInfo.WORLD_NAME]: string;
  [UserInfo.ASSISTANT_NAME]: string;
  money: number;
  energy: number;
  couponsCount: number;
  userSessionSocket: Centrifuge | null;
  avatar: string | null;
  msisdn: string | null;
  guid: string | null;
  freshProgressTimeout: number;
  showSlider: boolean;
  showTutorial: boolean;
  operatorId: number | null;
  isLoggedIn: boolean;
}
