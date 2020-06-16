import { post } from '../requests';
import { apiRoutes } from '..';
import { TowersTypes } from '../../effector/towers-progress/store';

export const commitIncomes = async (towerTitle: TowersTypes) => {
  const response = await post<IIncomesData>(
    apiRoutes.PRODUCTS + towerTitle + apiRoutes.COMMIT_INCOMES
  );
  return response.data;
};

export interface IIncomesData {
  state: string;
  data: { id: number; userId: number; balance: number };
}
