import { TowersTypes } from '../towers-progress/store';
import { typeOfMarkers } from '../../components/markers';
import { TowersMarkerDomain } from './domain';
import { hideMarker, setMarker } from './events';

const initState: TowersMarkerStoreType = {
  [TowersTypes.MAIN_TOWER]: {
    markers: [
      {
        type: typeOfMarkers.TIMER,
        startTime: new Date('Apr 17 2020 08:04:33 GMT+0300'),
        endTime: new Date('Apr 22 2020 15:04:33 GMT+0300'),
      },
    ],
  },
  [TowersTypes.MUSIC]: {
    markers: [],
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
    markers: [],
  },
  [TowersTypes.OBSERVATORY]: {
    markers: [],
  },
  [TowersTypes.TARIFF]: {
    markers: [{ type: typeOfMarkers.NOTICE }, { type: typeOfMarkers.SUCCESS }],
  },
  [TowersTypes.THEATER]: {
    markers: [
      {
        type: typeOfMarkers.TIMER,
        startTime: new Date('Apr 20 2020 07:04:33 GMT+0300'),
        endTime: new Date('Apr 22 2020 19:04:33 GMT+0300'),
      },
    ],
  },
  [TowersTypes.TV]: {
    markers: [],
  },
  [TowersTypes.STADIUM]: {
    markers: [],
  },
  [TowersTypes.AIRPORT]: {
    markers: [],
  },
  [TowersTypes.BANK]: {
    markers: [],
  },
  [TowersTypes.CYBER_ARENA]: {
    markers: [],
  },

  [TowersTypes.SATELLITETV]: {
    markers: [],
  },
  [TowersTypes.PARTNER_BLUE]: {
    markers: [],
  },
  [TowersTypes.PARTNER_YELLOW]: {
    markers: [],
  },
  [TowersTypes.SLOT_MACHINE]: {
    markers: [],
  },
  [TowersTypes.ROUTER]: {
    markers: [],
  },
  [TowersTypes.AUTO_FACTORY]: {
    markers: [],
  },
  [TowersTypes.RTK]: {
    markers: [],
  },
  [TowersTypes.PARTNER_BANK]: {
    markers: [],
  },
  [TowersTypes.MARVIN]: {
    markers: [],
  },
  [TowersTypes.CLOUD]: {
    markers: [],
  },
};

export const TowersMarkerStore = TowersMarkerDomain.store<
  TowersMarkerStoreType
>(initState)
  .on(hideMarker, (state, { towerTitle, type }) => ({
    ...state,
    [towerTitle]: {
      markers: state[towerTitle].markers.filter(item => item.type !== type),
    },
  }))
  .on(setMarker, (state, { towerTitle, type, ...rest }) => ({
    ...state,
    [towerTitle]: {
      markers: state[towerTitle].markers.find(
        searchItem => searchItem.type === type
      )
        ? state[towerTitle].markers
        : state[towerTitle].markers.concat([{ type, ...rest }]),
    },
  }));

type MarkerData = {
  markers: IMarker[];
};

export interface IMarker {
  type: typeOfMarkers;
  startTime?: Date;
  endTime?: Date;
  coins?: number;
}

type TowersMarkerStoreType = Record<TowersTypes, MarkerData>;
