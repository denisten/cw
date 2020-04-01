import { AppDomain } from './domain';
import { TowersTypes } from '../towers-progress/store';
import { MenuItems } from '../../UI/menu-paragraph';
import { AppConditionType } from './store';

export enum ScaleValues {
  HALF = 0.5,
  ORIGIN = 1,
}

export const userSelectedTower = AppDomain.event<IUserSelectedTower>(
  'User clicked to view extra info about building'
);
export const extraTowerInfoModalClosed = AppDomain.event(
  'User clicked to close extra info about building'
);
export const toggleExtraTowerInfoModal = AppDomain.event<number[]>(
  'User toggled modal window'
);
export const menuOpened = AppDomain.event<MenuItems>();
export const menuClosed = AppDomain.event();
export const updateScaleValue = AppDomain.event<ScaleValues>();
export const showUpgradeIcon = AppDomain.event<TowersTypes>();
export const editIsAuthorizedFlag = AppDomain.event<boolean>();
export const setCancelAuthorizationStatus = AppDomain.event<string>();
export const setAuthValue = AppDomain.event<AppConditionType>();

export interface IUserSelectedTower {
  towerTitle: TowersTypes | null;
}
