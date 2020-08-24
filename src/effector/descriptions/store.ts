import { TowersTypes } from '../towers-progress/store';
import { DescriptionsDomain } from './domain';
import { fetchDescriptions } from './events';

const initStore = {
  [TowersTypes.POISK]: {
    title: '',
    description: '',
    subscriptionText: 'Подписка активна',
  },
  [TowersTypes.GOODOK]: {
    title: '',
    description: '',
    subscriptionText: 'Пользователь услуги',
  },
  [TowersTypes.MAIN_TOWER]: {
    title: '',
    description: '',
    subscriptionText: 'Пользователь услуги',
  },
  [TowersTypes.WASD_TV]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.BANK]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.ROAMING]: {
    title: '',
    description: '',
    subscriptionText: 'Пользователь услуги',
  },
  [TowersTypes.FITNESS]: {
    title: '',
    description: '',
    subscriptionText: 'Пользователь продукта',
  },
  [TowersTypes.TV]: {
    title: '',
    description: '',
    subscriptionText: 'Подписка активна',
  },
  [TowersTypes.THEATER]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.MOBILE_NETWORK]: {
    title: '',
    description: '',
    subscriptionText: 'Пользователь услуги',
  },
  [TowersTypes.OBSERVATORY]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.LIBRARY]: {
    title: '',
    description: '',
    subscriptionText: 'Пользователь услуги',
  },
  [TowersTypes.LIVE_ARENA]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.MUSIC]: {
    title: '',
    description: '',
    subscriptionText: 'Подписка активна',
  },
  [TowersTypes.MY_MTS]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.CASHBACK]: {
    title: '',
    description: '',
    subscriptionText: 'Участник программы',
  },
  [TowersTypes.SPUTNIK]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.PARTNER_ONE]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.PARTNER_TWO]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.IGROTEKA]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.HOME_INTERNET]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.AUTO]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.SHOP]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.PARTNER_THREE]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.MARVIN]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.CONNECT]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.UNIVERSITY]: {
    title: '',
    description: '',
    subscriptionText: '',
  },
  [TowersTypes.SMARTMED]: {
    title: '',
    description: '',
    subscriptionText: '',
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
  subscriptionText: string;
}

type DescriptionStoreType = Record<TowersTypes, IDescriptionsBody>;
