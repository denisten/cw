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
}
const initState: TowersProgressStoreType = {
  [TowersTypes.MAIN_TOWER]: TowerLevel.high,
  [TowersTypes.MUSIC]: TowerLevel.high,
  [TowersTypes.ARENA]: TowerLevel.mid,
  [TowersTypes.MOLL]: TowerLevel.high,
  [TowersTypes.EGG]: TowerLevel.high,
  [TowersTypes.LIBRARY]: TowerLevel.mid,
  [TowersTypes.OBSERVATORY]: TowerLevel.mid,
  [TowersTypes.TARIFF]: TowerLevel.mid,
  [TowersTypes.THEATER]: TowerLevel.mid,
  [TowersTypes.TV]: TowerLevel.mid,
  [TowersTypes.STADIUM]: TowerLevel.mid,
  [TowersTypes.AIRPORT]: TowerLevel.high,
  [TowersTypes.MONEY_VAULT]: TowerLevel.mid,
};
export const TowersProgressStore = TowersProgressDomain.store<
  TowersProgressStoreType
>(initState);

type TowersProgressStoreType = Record<TowersTypes, TowerLevel>;
