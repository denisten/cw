import { get } from '../requests';
import { apiRoutes } from '..';

export const getTasks = async () => {
  const response = await get<IGetTasks>(apiRoutes.GET_TASKS);
  return response.data.data;
};

interface IGetTasks {
  data: {};
}
