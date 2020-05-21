import { get } from '../../requests';
import { apiRoutes } from '../../index';

export const generateTasks = async () => {
  await get<IGetUrl>(apiRoutes.GENERATE_TASKS);
};

interface IGetUrl {
  data: {};
}
