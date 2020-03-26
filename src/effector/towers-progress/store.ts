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
  BANK = 'bank',
  CYBER_ARENA = 'cyberArena',
  SATELLITETV = 'satelliteTv',
  PARTNER_BLUE = 'partnerBlue',
  PARTNER_YELLOW = 'partnerYellow',
  SLOT_MACHINE = 'slotMachine',
  ROUTER = 'router',
  AUTO_FACTORY = 'autoFactory',
  RTK = 'rtk',
  PARTNER_BANK = 'partnerBank',
  MARVIN = 'marvin',
  CLOUD = 'cloud',
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
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.MOLL]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.EGG]: {
    level: TowerLevel.low,
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
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.THEATER]: {
    level: TowerLevel.high,
    progress: 0,
  },
  [TowersTypes.TV]: {
    level: TowerLevel.low,
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
  [TowersTypes.BANK]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.CYBER_ARENA]: {
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
  [TowersTypes.SLOT_MACHINE]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.ROUTER]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.AUTO_FACTORY]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.RTK]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.PARTNER_BANK]: {
    level: TowerLevel.mid,
    progress: 0,
  },
  [TowersTypes.MARVIN]: {
    level: TowerLevel.low,
    progress: 0,
  },
  [TowersTypes.CLOUD]: {
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
