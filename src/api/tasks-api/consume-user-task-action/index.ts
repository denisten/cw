import { post } from '../../requests';
import { apiRoutes } from '../../index';
import { IChatTaskSessionRequest } from '../session';

export const consumeUserTaskActionRequest = async (
  taskId: number,
  messageId: number,
  actionId: number
) => {
  return await post<IChatTaskSessionRequest>(
    `${apiRoutes.CONSUME_USER_TASK_ACTION}/${taskId}/chat/messages/${messageId}/actions/${actionId}/consume`
  );
};
