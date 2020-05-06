import { TowersProgressDomain } from './domain';
import {
  addProgressPoints,
  addRefForTower,
  fetchAllProductsData,
  upgradeTower,
} from './events';
import { RefObject } from 'react';
export enum TowerLevel {
  low = 0,
  mid = 1,
  high = 2,
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
  CONNECT = 'connect',
}
const initState: TowersProgressStoreType = {
  [TowersTypes.MAIN_TOWER]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.MUSIC]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.LIVE_ARENA]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.CASHBACK]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.MY_MTS]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.LIBRARY]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.OBSERVATORY]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.TARIFF]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.THEATER]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.TV]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.FITNESS]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.ROAMING]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.BANK]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.WASD_TV]: {
    data: {
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
    ref: null,
  },

  [TowersTypes.SPUTNIK]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.PARTNER_BLUE]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.PARTNER_YELLOW]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.IGROTEKA]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.HOME_INTERNET]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.AUTO_FACTORY]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.SHOP]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.PARTNER_BANK]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.MARVIN]: {
    data: {
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
    ref: null,
  },
  [TowersTypes.CONNECT]: {
    data: {
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
    ref: null,
  },
};
export const TowersProgressStore = TowersProgressDomain.store<
  TowersProgressStoreType
>(initState)
  .on(addProgressPoints, (state, { towerTitle, points }) => ({
    ...state,
    [towerTitle]: {
      ...state[towerTitle],
      data: {
        ...state[towerTitle].data,
        points: state[towerTitle].data.points + points,
      },
    },
  }))
  .on(upgradeTower, (state, payload) => {
    return {
      ...state,
      [payload]: {
        ...state[payload],
        data: {
          ...state[payload].data,
          points: 0,
          level: {
            ...state[payload].data.level,
            id: state[payload].data.level.id + 1,
          },
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
  .on(fetchAllProductsData.done, (state, { result }) => {
    // console.log({ result });
    const newState = { ...state };
    Object.keys(result).map(el => {
      const a = el as TowersTypes;
      newState[a] = {
        data: {
          ...result[a],
        },
        ...state[a],
      };
    });
    // console.log({ newState });
    return {
      ...state,
    };
  });

type TowerData = {
  data: ITowerProgress;
  // level: TowerLevel;
  // progress: number;
  ref?: RefObject<HTMLDivElement> | null;
};

export type TowersProgressStoreType = Record<TowersTypes, TowerData>;

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
