import { TowersMarkerDomain } from './domain';
import { typeOfMarkers } from '../../components/markers';
import { TowersTypes } from '../towers-progress/store';

export const hideMarker = TowersMarkerDomain.event<IhideMarker>();
interface IhideMarker {
  type: typeOfMarkers;
  towerTitle: TowersTypes;
}
