import { TowersProgressDomain } from './domain';
import { addProgressPoints, addRefForTower, upgradeTower } from './events';
import { RefObject } from 'react';
export enum TowerLevel {
  deactive = 0,
  low = 1,
  mid = 2,
  high = 3,
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
    level: TowerLevel.deactive,
    progress: 0,
    ref: null,
  },
  [TowersTypes.MUSIC]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.ARENA]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.MOLL]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.EGG]: {
    level: TowerLevel.deactive,
    progress: 0,
    ref: null,
  },
  [TowersTypes.LIBRARY]: {
    level: TowerLevel.deactive,
    progress: 0,
    ref: null,
  },
  [TowersTypes.OBSERVATORY]: {
    level: TowerLevel.mid,
    progress: 0,
    ref: null,
  },
  [TowersTypes.TARIFF]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.THEATER]: {
    level: TowerLevel.high,
    progress: 0,
    ref: null,
  },
  [TowersTypes.TV]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.STADIUM]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.AIRPORT]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.BANK]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.CYBER_ARENA]: {
    level: TowerLevel.deactive,
    progress: 0,
    ref: null,
  },

  [TowersTypes.SATELLITETV]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.PARTNER_BLUE]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.PARTNER_YELLOW]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.SLOT_MACHINE]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.ROUTER]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.AUTO_FACTORY]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.RTK]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.PARTNER_BANK]: {
    level: TowerLevel.mid,
    progress: 0,
    ref: null,
  },
  [TowersTypes.MARVIN]: {
    level: TowerLevel.low,
    progress: 0,
    ref: null,
  },
  [TowersTypes.CLOUD]: {
    level: TowerLevel.low,
    progress: 0,
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
  })
  .on(addRefForTower, (state, { tower, ref }) => ({
    ...state,
    [tower]: {
      ...state[tower],
      ref,
    },
  }));

type TowerData = {
  level: TowerLevel;
  progress: number;
  ref?: RefObject<HTMLDivElement> | null;
};

type TowersProgressStoreType = Record<TowersTypes, TowerData>;
