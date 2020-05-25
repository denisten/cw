import { get } from '../requests';
import { apiRoutes } from '..';
import { TaskStatuses } from '../../effector/missions-store/store';

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

export interface ITask {
  status: TaskStatuses;
  id: number;
  task: {
    id: number;
    parentId: number;
    content: {
      id: number;
      taskType: {
        id: number;
        slug: string;
        name: string;
      };
      product: {
        id: number;
        name: string;
        slug: string;
        description: string;
      };
      logo: {
        id: number;
        content: string;
      };
      name: string;
      legend: string;
      description: string;
    };
    priorityNumber: number;
    energy: number;
    reward: number;
    availabilityTime: number;
    executionTime: number;
    betweenTasksTime: number;
    chat: string;
  };
}
