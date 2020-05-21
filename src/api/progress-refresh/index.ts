import { apiRoutes } from '..';
import { post } from '../requests';

export const progressRefresh = async () => {
  await post<IProgressRefresh>(apiRoutes.PROGRESS_REFRESH);
};

interface IProgressRefresh {
  state: string;
}
