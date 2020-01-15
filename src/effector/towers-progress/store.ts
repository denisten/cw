import { TowersProgressDomain } from './domain';
import { TowerLevel } from '../../buildings/first-building/enums';

export enum TowersTypes {
  MAIN_TOWER = 'mainTower',
}

const initState: TowersProgressStoreType = {
  [TowersTypes.MAIN_TOWER]: TowerLevel.low,
};
export const TowersProgressStore = TowersProgressDomain.store<
  TowersProgressStoreType
>(initState);

type TowersProgressStoreType = Record<TowersTypes | string, TowerLevel>;
