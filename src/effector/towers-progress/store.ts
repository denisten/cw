import { TowersProgressDomain } from './domain';
import { addProgressPoints, upgradeTower } from './events';
export enum TowerLevel {
  low = 0,
  mid = 1,
  high = 2,
}
export enum TowersTypes {
  MAIN_TOWER = 'mainTower',
  MUSIC = 'music',
  ARENA = 'arena',
  MOLL = 'moll',
  EGG = 'egg',
  LIBRARY = 'library',
  OBSERVATORY = 'observatory',
  TARIFF = 'tariff',
  THEATER = 'theater',
  TV = 'tv',
  STADIUM = 'stadium',
  AIRPORT = 'airport',
  MONEY_VAULT = 'moneyVault',
  BANK = 'bank',
  CYBER_ARENA = 'cyberArena',
  FACTORY = 'factory',
  SATELLITETV = 'satelliteTv',
  PARTNER_BLUE = 'partnerBlue',
  PARTNER_YELLOW = 'partnerYellow',
}
const initState: TowersProgressStoreType = {
  [TowersTypes.MAIN_TOWER]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.MUSIC]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.ARENA]: {
    level: TowerLevel.mid,
    progress: 0,
  },
  [TowersTypes.MOLL]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.EGG]: {
    level: TowerLevel.high,
    progress: 0,
  },
  [TowersTypes.LIBRARY]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.OBSERVATORY]: {
    level: TowerLevel.mid,
    progress: 0,
  },
  [TowersTypes.TARIFF]: {
    level: TowerLevel.mid,
    progress: 0,
  },
  [TowersTypes.THEATER]: {
    level: TowerLevel.mid,
    progress: 0,
  },
  [TowersTypes.TV]: {
    level: TowerLevel.mid,
    progress: 0,
  },
  [TowersTypes.STADIUM]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.AIRPORT]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.MONEY_VAULT]: {
    level: TowerLevel.mid,
    progress: 0,
  },
  [TowersTypes.BANK]: {
    level: TowerLevel.mid,
    progress: 0,
  },
  [TowersTypes.CYBER_ARENA]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.FACTORY]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.SATELLITETV]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.PARTNER_BLUE]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.PARTNER_YELLOW]: {
    level: TowerLevel.low,
    progress: 0,
  },
};
export const TowersProgressStore = TowersProgressDomain.store<
  TowersProgressStoreType
>(initState)
  .on(addProgressPoints, (state, { towerTitle, points }) => ({
    ...state,
    [towerTitle]: {
      ...state[towerTitle],
      progress: state[towerTitle].progress + points,
    },
  }))
  .on(upgradeTower, (state, payload) => {
    return {
      ...state,
      [payload]: {
        level: state[payload].level + 1,
        progress: 0,
      },
    };
  });

type TowerData = {
  level: TowerLevel;
  progress: number;
};

type TowersProgressStoreType = Record<TowersTypes, TowerData>;
