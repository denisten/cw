import { TowersProgressDomain } from './domain';
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
}
const initState: TowersProgressStoreType = {
  [TowersTypes.MAIN_TOWER]: {
    level: TowerLevel.high,
    progress: 0,
  },
  [TowersTypes.MUSIC]: {
    level: TowerLevel.high,
    progress: 0,
  },
  [TowersTypes.ARENA]: {
    level: TowerLevel.mid,
    progress: 0,
  },
  [TowersTypes.MOLL]: {
    level: TowerLevel.high,
    progress: 0,
  },
  [TowersTypes.EGG]: {
    level: TowerLevel.high,
    progress: 0,
  },
  [TowersTypes.LIBRARY]: {
    level: TowerLevel.high,
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
    level: TowerLevel.mid,
    progress: 0,
  },
  [TowersTypes.AIRPORT]: {
    level: TowerLevel.high,
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
};
export const TowersProgressStore = TowersProgressDomain.store<
  TowersProgressStoreType
>(initState);

type TowerData = {
  level: TowerLevel;
  progress: number;
};

type TowersProgressStoreType = Record<TowersTypes, TowerData>;
