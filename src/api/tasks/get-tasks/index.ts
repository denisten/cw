import { get } from '../../requests';
import { apiRoutes } from '../../index';
import { ITask } from '../../../effector/missions-store/store';

export const getTasks = async () => {
  const response = await get<IGetTasks>(apiRoutes.GET_TASKS);
  return response.data.data;
};

interface IGetTasks {
  data: {
    userTasks: ITask[];
    total: number;
  };
}
