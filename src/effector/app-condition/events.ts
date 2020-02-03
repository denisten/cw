import { AppDomain } from './domain';
import { TowersTypes } from '../towers-progress/store';

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
export const profileInfoModalWindowOpened = AppDomain.event();
export const profileInfoModalWindowClosed = AppDomain.event();
export const updateScaleValue = AppDomain.event<ScaleValues>();
export const updateFocusOnValue = AppDomain.event<number[]>();
export const taskModalWindowOpened = AppDomain.event();
export const taskModalWindowClosed = AppDomain.event();
