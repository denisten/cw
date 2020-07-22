import { post } from '../../requests';
import { apiRoutes } from '../../index';
import { IChatTaskSessionRequest } from '../session';

export const consumeUserTaskActionRequest = async (
  taskId: number,
  blockId: number,
  actionId: number
) => {
  return await post<IChatTaskSessionRequest>(
    `${apiRoutes.CONSUME_USER_TASK_ACTION}/${taskId}/chat/blocks/${blockId}/actions/${actionId}/consume`
  );
};
