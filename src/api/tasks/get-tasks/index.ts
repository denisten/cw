import { get } from '../../requests';
import { apiRoutes } from '../../index';
import { ITask } from '../../../effector/missions-store/store';
import { decreaseTimer } from '../../../effector/missions-store/events';

let interval = 0;
const second = 1000;

export const getTasks = async () => {
  const response = await get<IGetTasks>(apiRoutes.GET_TASKS);
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    decreaseTimer();
  }, second);
  return response.data.data;
};

interface IGetTasks {
  data: {
    userTasks: ITask[];
    total: number;
  };
}
