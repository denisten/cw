import { post } from '../../requests';
import { apiRoutes } from '../../index';
import { IGetTasks } from '../../../effector/tasks-store/store';

export const activateTaskRequest = async (id: number) => {
  const response = await post<IGetTasks>(
    `${apiRoutes.GET_TASKS}/${id}/activate`
  );
  return response.data.data;
};
