import { TowersProgressDomain } from './domain';
import { TowerLevel } from '../../buildings/config';

export enum TowersTypes {
  MAIN_TOWER = 'mainTower',
  MUSIC = 'music',
}

const initState: TowersProgressStoreType = {
  [TowersTypes.MAIN_TOWER]: TowerLevel.high,
  [TowersTypes.MUSIC]: TowerLevel.high,
};
export const TowersProgressStore = TowersProgressDomain.store<
  TowersProgressStoreType
>(initState);

type TowersProgressStoreType = Record<TowersTypes, TowerLevel>;
