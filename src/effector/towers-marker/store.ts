import { TowersTypes } from '../towers-progress/store';
import { typeOfMarkers } from '../../components/markers';
import { TowersMarkerDomain } from './domain';
import { hideMarker } from './events';

const initState: TowersMarkerStoreType = {
  [TowersTypes.MAIN_TOWER]: {
    markers: [
      {
        type: typeOfMarkers.TIMER,
        startTime: new Date('Fri Apr 17 2020 08:04:33 GMT+0300'),
        endTime: new Date('Mon Apr 20 2020 15:04:33 GMT+0300'),
      },
    ],
  },
  [TowersTypes.MUSIC]: {
    markers: null,
  },
  [TowersTypes.ARENA]: {
    markers: [{ type: typeOfMarkers.COIN, coins: 11221 }],
  },
  [TowersTypes.MOLL]: {
    markers: [
      { type: typeOfMarkers.SUCCESS },
      { type: typeOfMarkers.COIN, coins: 10000 },
    ],
  },
  [TowersTypes.EGG]: {
    markers: [{ type: typeOfMarkers.COIN, coins: 15000 }],
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
  markers:
    | {
        type: typeOfMarkers;
        startTime?: Date;
        endTime?: Date;
        coins?: number;
      }[]
    | null;
};

type TowersMarkerStoreType = Record<TowersTypes, MarkerData>;
