import { TowersProgressDomain } from './domain';
import {
  addProgressPoints,
  addRefForTower,
  fetchAllProductsData,
  upgradeTower,
} from './events';
export enum TowerLevel {
  deactive = 0,
  low = 1,
  mid = 2,
  high = 3,
}
export enum TowersTypes {
  MAIN_TOWER = 'mainTower',
  MUSIC = 'music',
  LIVE_ARENA = 'live-arena',
  CASHBACK = 'cashback',
  MY_MTS = 'my-mts',
  LIBRARY = 'library',
  OBSERVATORY = 'observatory',
  TARIFF = 'tariff',
  THEATER = 'theater',
  TV = 'digital-tv',
  FITNESS = 'fitness',
  ROAMING = 'roaming',
  BANK = 'bank',
  WASD_TV = 'wasd-tv',
  SPUTNIK = 'sputnik',
  PARTNER_BLUE = 'partnerBlue',
  PARTNER_YELLOW = 'partnerYellow',
  IGROTEKA = 'igroteka',
  HOME_INTERNET = 'home-internet',
  AUTO_FACTORY = 'autoFactory',
  SHOP = 'shop',
  PARTNER_BANK = 'partnerBank',
  MARVIN = 'marvin',
  UNIVERSITY = 'university',
  CONNECT = 'connect',
}
const initState: TowersProgressStoreType = {
  [TowersTypes.UNIVERSITY]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.MAIN_TOWER]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.MUSIC]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.LIVE_ARENA]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.CASHBACK]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.MY_MTS]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.LIBRARY]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.OBSERVATORY]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.mid,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.TARIFF]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.THEATER]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.high,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.TV]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.FITNESS]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.ROAMING]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.low,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.BANK]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.WASD_TV]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.low,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },

  [TowersTypes.SPUTNIK]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.low,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.PARTNER_BLUE]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.low,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.PARTNER_YELLOW]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.low,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.IGROTEKA]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.low,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.HOME_INTERNET]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.low,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.AUTO_FACTORY]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.low,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.SHOP]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.low,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.PARTNER_BANK]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.mid,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.MARVIN]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.deactive,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
  [TowersTypes.CONNECT]: {
    productId: 1,
    points: 0,
    level: {
      id: TowerLevel.low,
      name: '0 уровень',
      value: 0,
    },
    productIncome: {
      id: 1,
      productId: 1,
      value: 10,
    },
  },
};
export const TowersProgressStore = TowersProgressDomain.store<
  TowersProgressStoreType
>(initState)
  .on(addProgressPoints, (state, { towerTitle, points }) => ({
    ...state,
    [towerTitle]: {
      ...state[towerTitle],
      points: state[towerTitle].points + points,
    },
  }))
  .on(upgradeTower, (state, payload) => {
    return {
      ...state,
      [payload]: {
        ...state[payload],
        points: 0,
        level: {
          ...state[payload].level,
          id: state[payload].level.id + 1,
        },
      },
    };
  })
  .on(addRefForTower, (state, { tower, ref }) => ({
    ...state,
    [tower]: {
      ...state[tower],
      ref,
    },
  }))
  .on(fetchAllProductsData.done, (state, { result }) => ({
    ...state,
    ...result,
  }));

export type TowersProgressStoreType = Record<TowersTypes, ITowerProgress>;

export interface ITowerProgress {
  productId: number;
  points: number;
  level: {
    id: TowerLevel;
    name: string;
    value: number;
  };
  productIncome: {
    id: number;
    productId: number;
    value: number;
  };
}
