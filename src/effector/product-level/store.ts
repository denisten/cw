import { ProductLevelDomain } from './domain';
import { TowerLevel } from '../towers-progress/store';
const initState: IProductLevel = {
  [TowerLevel.initial]: {
    income: 0,
    maxProgressValue: 29,
    minProgressValue: 0,
    name: '0 уровень',
  },
  [TowerLevel.low]: {
    income: 2,
    maxProgressValue: 299,
    minProgressValue: 30,
    name: '1 уровень',
  },
  [TowerLevel.mid]: {
    income: 3,
    maxProgressValue: 699,
    minProgressValue: 300,
    name: '2 уровень',
  },
  [TowerLevel.high]: {
    income: 5,
    maxProgressValue: null,
    minProgressValue: 700,
    name: '3 уровень',
  },
};

export const ProductLevelStore = ProductLevelDomain.store(initState);

export type IProductLevel = Record<TowerLevel, ICurrentLevelData>;

export interface ICurrentLevelData {
  income: number;
  maxProgressValue: number | null;
  minProgressValue: number;
  name: string;
}
