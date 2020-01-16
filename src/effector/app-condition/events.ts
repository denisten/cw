import { AppDomain } from './domain';
import { TowersTypes } from '../towers-progress/store';

export enum ScaleValues {
  HALF = 0.5,
  ORIGIN = 1,
}

export const modalWindowOpen = AppDomain.event<TowersTypes>(
  'User clicked to view extra info about building'
);
export const modalWindowClosed = AppDomain.event(
  'User clicked to close extra info about building'
);
export const toggleModalWindow = AppDomain.event<TowersTypes>(
  'User toggled modal window'
);
export const updateScaleValue = AppDomain.event<ScaleValues>();
