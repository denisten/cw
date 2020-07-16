import { post } from '../../requests';
import { apiRoutes } from '../../index';
import { IGetTasks } from '../get-tasks';

export const activateTaskRequest = async (id: number) => {
  const response = await post<IGetTasks>(
    `${apiRoutes.GET_TASKS}/${id}/activate`
  );
  return response.data.data;
};
