import { TowersTypes } from '../towers-progress/store';
import { DescriptionsDomain } from './domain';
import { fetchDescriptions } from './events';

const initStore = {
  [TowersTypes.POISK]: {
    title: '',
    description: '',
  },
  [TowersTypes.GOODOK]: {
    title: '',
    description: '',
  },
  [TowersTypes.MAIN_TOWER]: {
    title: '',
    description: '',
  },
  [TowersTypes.WASD_TV]: {
    title: '',
    description: '',
  },
  [TowersTypes.BANK]: {
    title: '',
    description: '',
  },
  [TowersTypes.ROAMING]: {
    title: '',
    description: '',
  },
  [TowersTypes.FITNESS]: {
    title: '',
    description: '',
  },
  [TowersTypes.TV]: {
    title: '',
    description: '',
  },
  [TowersTypes.THEATER]: {
    title: '',
    description: '',
  },
  [TowersTypes.MOBILE_NETWORK]: {
    title: '',
    description: '',
  },
  [TowersTypes.OBSERVATORY]: {
    title: '',
    description: '',
  },
  [TowersTypes.LIBRARY]: {
    title: '',
    description: '',
  },
  [TowersTypes.LIVE_ARENA]: {
    title: '',
    description: '',
  },
  [TowersTypes.MUSIC]: {
    title: '',
    description: '',
  },
  [TowersTypes.MY_MTS]: {
    title: '',
    description: '',
  },
  [TowersTypes.CASHBACK]: {
    title: '',
    description: '',
  },
  [TowersTypes.SPUTNIK]: {
    title: '',
    description: '',
  },
  [TowersTypes.PARTNER_ONE]: {
    title: '',
    description: '',
  },
  [TowersTypes.PARTNER_TWO]: {
    title: '',
    description: '',
  },
  [TowersTypes.IGROTEKA]: {
    title: '',
    description: '',
  },
  [TowersTypes.HOME_INTERNET]: {
    title: '',
    description: '',
  },
  [TowersTypes.AUTO]: {
    title: '',
    description: '',
  },
  [TowersTypes.SHOP]: {
    title: '',
    description: '',
  },
  [TowersTypes.PARTNER_THREE]: {
    title: '',
    description: '',
  },
  [TowersTypes.MARVIN]: {
    title: '',
    description: '',
  },
  [TowersTypes.CONNECT]: {
    title: '',
    description: '',
  },
  [TowersTypes.UNIVERSITY]: {
    title: '',
    description: '',
  },
  [TowersTypes.SMARTMED]: {
    title: '',
    description: '',
  },
};

export const DescriptionStore = DescriptionsDomain.store<DescriptionStoreType>(
  initStore
).on(fetchDescriptions.doneData, (state, payload) => {
  const stateClone = { ...state };
  payload.forEach(product => {
    stateClone[product.slug].description = product.description;
    stateClone[product.slug].title = product.title;
  });

  return stateClone;
});

interface IDescriptionsBody {
  title: string;
  description: string;
}

type DescriptionStoreType = Record<TowersTypes, IDescriptionsBody>;
