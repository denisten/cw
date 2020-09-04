import { ProductLevelDomain } from './domain';
import { fetchProductLevelData } from './events';

const initState = [
  {
    id: 1,
    income: 0,
    maxProgressValue: 29,
    minProgressValue: 0,
    name: '0 уровень',
  },
  {
    id: 2,
    income: 2,
    maxProgressValue: 299,
    minProgressValue: 30,
    name: '1 уровень',
  },
  {
    id: 3,
    income: 3,
    maxProgressValue: 699,
    minProgressValue: 300,
    name: '2 уровень',
  },
  {
    id: 4,
    income: 5,
    maxProgressValue: null,
    minProgressValue: 700,
    name: '3 уровень',
  },
];

export const ProductLevelStore = ProductLevelDomain.store<IProductLevel[]>(
  initState
).on(fetchProductLevelData.doneData, (state, payload) => payload);

export interface IProductLevel {
  id: number;
  income: number;
  maxProgressValue: number | null;
  minProgressValue: number | null;
  name: string;
}
