import { AppDomain } from './domain';
import { TowersTypes } from '../towers-progress/store';
import { MenuItems } from '../../UI/menu-paragraph';

export enum ScaleValues {
  HALF = 0.5,
  ORIGIN = 1,
}

export type ExtraTowerInfoModalOpenedProps = {
  coords: number[];
  towerTitle: TowersTypes | null;
};

export const extraTowerInfoModalOpened = AppDomain.event<
  ExtraTowerInfoModalOpenedProps
>('User clicked to view extra info about building');
export const extraTowerInfoModalClosed = AppDomain.event(
  'User clicked to close extra info about building'
);
export const toggleExtraTowerInfoModal = AppDomain.event<number[]>(
  'User toggled modal window'
);
export const menuOpened = AppDomain.event<MenuItems>();
export const menuClosed = AppDomain.event();
export const updateScaleValue = AppDomain.event<ScaleValues>();
export const updateFocusOnValue = AppDomain.event<number[]>();
export const showUpgradeIcon = AppDomain.event<TowersTypes>();
export const editIsAuthorizedFlag = AppDomain.event<boolean>();

export const nextTutorStep = AppDomain.event();
export const turnOffTutorialMode = AppDomain.event();
export const nextTutorDescriptionStep = AppDomain.event();
