import { AppDomain } from './domain';
import { TowersTypes } from '../towers-progress/store';

export enum ScaleValues {
  HALF = 0.5,
  ORIGIN = 1,
}

export const extraTowerInfoModalOpened = AppDomain.event<TowersTypes>(
  'User clicked to view extra info about building'
);
export const extraTowerInfoModalClosed = AppDomain.event(
  'User clicked to close extra info about building'
);
export const toggleExtraTowerInfoModal = AppDomain.event<TowersTypes>(
  'User toggled modal window'
);
export const profileInfoModalWindowOpened = AppDomain.event();
export const profileInfoModalWindowClosed = AppDomain.event();
export const updateScaleValue = AppDomain.event<ScaleValues>();
