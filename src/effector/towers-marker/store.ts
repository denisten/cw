import { TowersTypes } from '../towers-progress/store';
import { typeOfMarkers } from '../../components/markers';
import { TowersMarkerDomain } from './domain';
import { hideMarker } from './events';

const initState: TowersMarkerStoreType = {
  [TowersTypes.MAIN_TOWER]: {
    markers: null,
  },
  [TowersTypes.MUSIC]: {
    markers: null,
  },
  [TowersTypes.ARENA]: {
    markers: null,
  },
  [TowersTypes.MOLL]: {
    markers: null,
  },
  [TowersTypes.EGG]: {
    markers: [{ type: typeOfMarkers.COIN }],
  },
  [TowersTypes.LIBRARY]: {
    markers: null,
  },
  [TowersTypes.OBSERVATORY]: {
    markers: null,
  },
  [TowersTypes.TARIFF]: {
    markers: [{ type: typeOfMarkers.NOTICE }, { type: typeOfMarkers.SUCCESS }],
  },
  [TowersTypes.THEATER]: {
    markers: null,
  },
  [TowersTypes.TV]: {
    markers: null,
  },
  [TowersTypes.STADIUM]: {
    markers: null,
  },
  [TowersTypes.AIRPORT]: {
    markers: null,
  },
  [TowersTypes.BANK]: {
    markers: null,
  },
  [TowersTypes.CYBER_ARENA]: {
    markers: null,
  },

  [TowersTypes.SATELLITETV]: {
    markers: null,
  },
  [TowersTypes.PARTNER_BLUE]: {
    markers: null,
  },
  [TowersTypes.PARTNER_YELLOW]: {
    markers: null,
  },
  [TowersTypes.SLOT_MACHINE]: {
    markers: null,
  },
  [TowersTypes.ROUTER]: {
    markers: null,
  },
  [TowersTypes.AUTO_FACTORY]: {
    markers: null,
  },
  [TowersTypes.RTK]: {
    markers: null,
  },
  [TowersTypes.PARTNER_BANK]: {
    markers: null,
  },
  [TowersTypes.MARVIN]: {
    markers: null,
  },
  [TowersTypes.CLOUD]: {
    markers: null,
  },
};

export const TowersMarkerStore = TowersMarkerDomain.store<
  TowersMarkerStoreType
>(initState).on(hideMarker, (state, { towerTitle, type }) => ({
  ...state,
  [towerTitle]: {
    markers: state[towerTitle].markers?.filter(item => item.type !== type),
  },
}));

type MarkerData = {
  markers: { type: typeOfMarkers; duration?: number }[] | null;
};

type TowersMarkerStoreType = Record<TowersTypes, MarkerData>;
