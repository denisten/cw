import { TowersMarkerDomain } from './domain';
import { IMarker } from './store';
import { TowersTypes } from '../towers-progress/store';

export const hideMarker = TowersMarkerDomain.event<IMarkerAction>();
export const setMarker = TowersMarkerDomain.event<IMarkerAction>();
export const resetTowersMarker = TowersMarkerDomain.event();

interface IMarkerAction extends IMarker {
  towerTitle: TowersTypes;
}
