import { TowersTypes } from '../towers-progress/store';
import { TypeOfMarkers } from '../../components/markers';
import { TowersMarkerDomain } from './domain';
import { hideMarker, setMarker } from './events';

const initState: TowersMarkerStoreType = {
  [TowersTypes.POISK]: {
    markers: [],
  },
  [TowersTypes.GOODOK]: {
    markers: [],
  },
  [TowersTypes.SMARTMED]: {
    markers: [{ type: TypeOfMarkers.SUCCESS }],
  },
  [TowersTypes.UNIVERSITY]: {
    markers: [],
  },
  [TowersTypes.MAIN_TOWER]: {
    markers: [
      {
        type: TypeOfMarkers.TIMER,
        startTime: new Date('Apr 22 2020 08:04:33 GMT+0300'),
        endTime: new Date('Apr 26 2020 15:04:33 GMT+0300'),
      },
    ],
  },
  [TowersTypes.MUSIC]: {
    markers: [],
  },
  [TowersTypes.LIVE_ARENA]: {
    markers: [{ type: TypeOfMarkers.COIN, coins: 11221 }],
  },
  [TowersTypes.CASHBACK]: {
    markers: [
      { type: TypeOfMarkers.SUCCESS },
      { type: TypeOfMarkers.COIN, coins: 10000 },
    ],
  },
  [TowersTypes.MY_MTS]: {
    markers: [{ type: TypeOfMarkers.COIN, coins: 15000 }],
  },
  [TowersTypes.LIBRARY]: {
    markers: [],
  },
  [TowersTypes.OBSERVATORY]: {
    markers: [],
  },
  [TowersTypes.MOBILE_NETWORK]: {
    markers: [{ type: TypeOfMarkers.NOTICE }, { type: TypeOfMarkers.SUCCESS }],
  },
  [TowersTypes.THEATER]: {
    markers: [
      {
        type: TypeOfMarkers.TIMER,
        startTime: new Date('Apr 20 2020 07:04:33 GMT+0300'),
        endTime: new Date('Apr 22 2020 19:04:33 GMT+0300'),
      },
    ],
  },
  [TowersTypes.TV]: {
    markers: [],
  },
  [TowersTypes.FITNESS]: {
    markers: [],
  },
  [TowersTypes.ROAMING]: {
    markers: [],
  },
  [TowersTypes.BANK]: {
    markers: [],
  },
  [TowersTypes.WASD_TV]: {
    markers: [],
  },

  [TowersTypes.SPUTNIK]: {
    markers: [],
  },
  [TowersTypes.PARTNER_ONE]: {
    markers: [],
  },
  [TowersTypes.PARTNER_TWO]: {
    markers: [],
  },
  [TowersTypes.IGROTEKA]: {
    markers: [],
  },
  [TowersTypes.HOME_INTERNET]: {
    markers: [],
  },
  [TowersTypes.AUTO]: {
    markers: [],
  },
  [TowersTypes.SHOP]: {
    markers: [],
  },
  [TowersTypes.PARTNER_BANK]: {
    markers: [],
  },
  [TowersTypes.MARVIN]: {
    markers: [],
  },
  [TowersTypes.CONNECT]: {
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
  type: TypeOfMarkers;
  startTime?: Date;
  endTime?: Date;
  coins?: number;
}

type TowersMarkerStoreType = Record<TowersTypes, MarkerData>;
