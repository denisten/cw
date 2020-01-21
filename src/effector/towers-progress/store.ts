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
}
const initState: TowersProgressStoreType = {
  [TowersTypes.MAIN_TOWER]: TowerLevel.high,
  [TowersTypes.MUSIC]: TowerLevel.high,
  [TowersTypes.ARENA]: TowerLevel.mid,
  [TowersTypes.MOLL]: TowerLevel.mid,
};
export const TowersProgressStore = TowersProgressDomain.store<
  TowersProgressStoreType
>(initState);

type TowersProgressStoreType = Record<TowersTypes, TowerLevel>;
