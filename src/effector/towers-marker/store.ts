import { TowersTypes } from '../towers-progress/store';
import { TypeOfMarkers } from '../../components/markers';
import { TowersMarkerDomain } from './domain';
import {
  hideMarker,
  resetTowersMarker,
  setMarker,
  clearTaskMarkersOnCurrentTower,
} from './events';

const initState: TowersMarkerStoreType = {
  [TowersTypes.POISK]: {
    markers: [],
  },
  [TowersTypes.GOODOK]: {
    markers: [],
  },
  [TowersTypes.SMARTMED]: {
    markers: [],
  },
  [TowersTypes.UNIVERSITY]: {
    markers: [],
  },
  [TowersTypes.MAIN_TOWER]: {
    markers: [],
  },
  [TowersTypes.MUSIC]: {
    markers: [],
  },
  [TowersTypes.LIVE_ARENA]: {
    markers: [],
  },
  [TowersTypes.CASHBACK]: {
    markers: [],
  },
  [TowersTypes.MY_MTS]: {
    markers: [],
  },
  [TowersTypes.CASHBACK]: {
    markers: [],
  },
  [TowersTypes.MY_MTS]: {
    markers: [],
  },
  [TowersTypes.LIBRARY]: {
    markers: [],
  },
  [TowersTypes.OBSERVATORY]: {
    markers: [],
  },
  [TowersTypes.MOBILE_NETWORK]: {
    markers: [],
  },
  [TowersTypes.THEATER]: {
    markers: [],
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
  [TowersTypes.PARTNER_THREE]: {
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
  .on(clearTaskMarkersOnCurrentTower, (state, payload) => ({
    ...state,
    [payload]: {
      markers: state[payload].markers.filter(
        marker =>
          marker.type !== TypeOfMarkers.ACTIVE_TASK &&
          marker.type !== TypeOfMarkers.TASK &&
          marker.type !== TypeOfMarkers.SUCCESS
      ),
    },
  }))
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
  }))
  .reset(resetTowersMarker);

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
