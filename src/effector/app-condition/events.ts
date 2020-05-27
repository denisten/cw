import { AppDomain } from './domain';
import { TowersTypes } from '../towers-progress/store';
import { MenuItems } from '../../UI/menu-paragraph';
import { AppConditionType, TowerInfoContentValues } from './store';

export enum ScaleValues {
  SCALE_STEP = 0.1,
  MAX_SCALE = 1.5,
  MIN_SCALE = 0.5,
}

export const extraTowerInfoModalOpen = AppDomain.event<TowersTypes | null>(
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
export const showUpgradeIcon = AppDomain.event<TowersTypes | null>();
export const editIsAuthorizedFlag = AppDomain.event<boolean>();
export const setCancelAuthorizationStatus = AppDomain.event<string>();
export const setAuthValue = AppDomain.event<AppConditionType>();
export const setHideTowerInfo = AppDomain.event<boolean>();
export const setLoaded = AppDomain.event();
export const setTowerInfoContent = AppDomain.event<TowerInfoContentValues>();
export const setTowerInfoShift = AppDomain.event<number>();
export interface IUserSelectedTower {
  towerTitle: TowersTypes | null;
}
