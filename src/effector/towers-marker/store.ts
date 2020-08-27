import { TowersTypes } from '../towers-progress/store';
import { MarkerTypes } from '../../components/markers';
import { TowersMarkerDomain } from './domain';
import { hideMarker, resetTowersMarker, setMarker } from './events';

const initState: TowersMarkerStoreType = {
  [TowersTypes.POISK]: [],
  [TowersTypes.GOODOK]: [],
  [TowersTypes.SMARTMED]: [],
  [TowersTypes.UNIVERSITY]: [],
  [TowersTypes.MAIN_TOWER]: [],
  [TowersTypes.MUSIC]: [],
  [TowersTypes.LIVE_ARENA]: [],
  [TowersTypes.CASHBACK]: [],
  [TowersTypes.MY_MTS]: [{ type: MarkerTypes.PLAY }],
  [TowersTypes.CASHBACK]: [],
  [TowersTypes.LIBRARY]: [],
  [TowersTypes.OBSERVATORY]: [],
  [TowersTypes.MOBILE_NETWORK]: [],
  [TowersTypes.THEATER]: [],
  [TowersTypes.TV]: [],
  [TowersTypes.FITNESS]: [],
  [TowersTypes.ROAMING]: [],
  [TowersTypes.BANK]: [],
  [TowersTypes.WASD_TV]: [],
  [TowersTypes.SPUTNIK]: [],
  [TowersTypes.PARTNER_ONE]: [],
  [TowersTypes.PARTNER_TWO]: [],
  [TowersTypes.IGROTEKA]: [{ type: MarkerTypes.PLAY }],
  [TowersTypes.HOME_INTERNET]: [],
  [TowersTypes.AUTO]: [],
  [TowersTypes.SHOP]: [{ type: MarkerTypes.PLAY }],
  [TowersTypes.PARTNER_THREE]: [],
  [TowersTypes.MARVIN]: [],
  [TowersTypes.CONNECT]: [],
};

export const TowersMarkerStore = TowersMarkerDomain.store<
  TowersMarkerStoreType
>(initState)
  .on(hideMarker, (state, { towerTitle, type }) => ({
    ...state,
    [towerTitle]: state[towerTitle].filter(item => item.type !== type),
  }))
  .on(setMarker, (state, { towerTitle, type, ...rest }) => ({
    ...state,
    [towerTitle]: state[towerTitle].find(searchItem => searchItem.type === type)
      ? state[towerTitle]
      : state[towerTitle].concat([{ type, ...rest }]),
  }))
  .reset(resetTowersMarker);

export interface IMarker {
  type: MarkerTypes;
  startTime?: Date;
  endTime?: Date;
  coins?: number;
}

type TowersMarkerStoreType = Record<TowersTypes, IMarker[]>;
