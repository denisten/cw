import { TowersProgressDomain } from './domain';
import {
  addProgressPoints,
  addRefForTower,
  fetchAllProductsData,
  upgradeTower,
  addTowerProgressData,
  resetTowerProgress,
  tutorialTowerUpgrade,
} from './events';
import { maxPercent } from '../../constants';

export enum TowerLevel {
  initial = 0,
  low = 1,
  mid = 2,
  high = 3,
}

export enum TowersTypes {
  MAIN_TOWER = 'cellular',
  MUSIC = 'music',
  LIVE_ARENA = 'live-arena',
  CASHBACK = 'cashback',
  MY_MTS = 'my-mts',
  LIBRARY = 'library',
  OBSERVATORY = 'observatory',
  MOBILE_NETWORK = 'mobile-network',
  THEATER = 'live',
  TV = 'digital-tv',
  FITNESS = 'fitness',
  ROAMING = 'roaming',
  BANK = 'bank',
  WASD_TV = 'wasd-tv',
  SPUTNIK = 'satellite-tv',
  PARTNER_ONE = 'partnerOne',
  PARTNER_TWO = 'partnerTwo',
  IGROTEKA = 'igroteka',
  HOME_INTERNET = 'home-internet',
  AUTO = 'auto',
  SHOP = 'shop',
  PARTNER_THREE = 'partnerThree',
  MARVIN = 'marvin',
  UNIVERSITY = 'smart-university',
  CONNECT = 'second-memory',
  SMARTMED = 'smart-med',
  GOODOK = 'goodok',
  POISK = 'poisk',
}
const initState: TowersProgressStoreType = {
  [TowersTypes.POISK]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.GOODOK]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.SMARTMED]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.UNIVERSITY]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.MAIN_TOWER]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.MUSIC]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.LIVE_ARENA]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.CASHBACK]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.MY_MTS]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.LIBRARY]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.OBSERVATORY]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.MOBILE_NETWORK]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.THEATER]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.TV]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.FITNESS]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.ROAMING]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.BANK]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.WASD_TV]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },

  [TowersTypes.SPUTNIK]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.PARTNER_ONE]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.PARTNER_TWO]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.IGROTEKA]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.HOME_INTERNET]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.AUTO]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.SHOP]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.PARTNER_THREE]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.MARVIN]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
  [TowersTypes.CONNECT]: {
    productId: 1,
    points: 0,
    levelOnServer: 0,
    needUpgrade: false,
    level: {
      id: 0,
      name: '0 уровень',
      level: TowerLevel.initial,
      income: 0,
      levelUpPercentage: 0,
    },
  },
};
export const TowersProgressStore = TowersProgressDomain.store<
  TowersProgressStoreType
>(initState)
  .on(addProgressPoints, (state, { towerTitle, points }) => {
    if (state[towerTitle].level.levelUpPercentage + points >= maxPercent) {
      return {
        ...state,
        [towerTitle]: {
          ...state[towerTitle],
          needUpgrade: true,
          level: {
            ...state[towerTitle].level,
            levelUpPercentage: maxPercent,
          },
        },
      };
    } else {
      return {
        ...state,
        [towerTitle]: {
          ...state[towerTitle],
          level: {
            ...state[towerTitle].level,
            levelUpPercentage:
              state[towerTitle].level.levelUpPercentage + points,
          },
        },
      };
    }
  })
  .on(tutorialTowerUpgrade, (state, payload) => ({
    ...state,
    [payload]: {
      ...state[payload],
      points: 0,
      needUpgrade: false,
      level: {
        ...state[payload].level,
        level: state[payload].level.level + 1,
        levelUpPercentage: 0,
      },
    },
  }))
  .on(upgradeTower, (state, towerTitle) => ({
    ...state,
    [towerTitle]: {
      ...state[towerTitle],
      needUpgrade: false,
      level: {
        ...state[towerTitle].level,
        level: state[towerTitle].levelOnServer,
      },
    },
  }))
  .on(addRefForTower, (state, { tower, ref }) => ({
    ...state,
    [tower]: {
      ...state[tower],
      ref,
    },
  }))
  .on(fetchAllProductsData.doneData, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .on(
    addTowerProgressData,
    (state, { towerTitle, newLevel, levelUpPercentage, income, factors }) => {
      if (newLevel > state[towerTitle].level.level)
        return {
          ...state,
          [towerTitle]: {
            ...state[towerTitle],
            needUpgrade: true,
            levelOnServer: newLevel,
            level: {
              ...state[towerTitle].level,
              levelUpPercentage,
              income,
            },
            factors,
          },
        };
      else
        return {
          ...state,
          [towerTitle]: {
            ...state[towerTitle],
            levelOnServer: newLevel,
            level: {
              ...state[towerTitle].level,
              levelUpPercentage,
              income,
            },
            factors,
          },
        };
    }
  )
  .reset(resetTowerProgress);

export type TowersProgressStoreType = Record<TowersTypes, ITowerProgress>;

export interface IFactors {
  hasCurrentUsage: { value: boolean };
}

export interface ITowerProgress {
  productId: number;
  points: number;
  levelOnServer: number;
  needUpgrade: boolean;
  level: {
    levelUpPercentage: number;
    id: number;
    name: string;
    level: TowerLevel;
    income: number;
  };
  factors?: IFactors;
}
