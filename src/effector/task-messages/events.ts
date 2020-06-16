import { TaskMessagesDomain } from './domain';
import { chatTaskSessionRequest } from '../../api/tasks/session';
import { consumeUserTaskActionRequest } from '../../api/tasks/consume-user-task-action';

export const chatTaskSession = TaskMessagesDomain.effect(
  'download chat session data',
  {
    handler: async (id: number) => {
      const request = await chatTaskSessionRequest(id);
      return request.data.data;
    },
  }
);

export const createMockupOfMessages = TaskMessagesDomain.event();

export const consumeUserTaskAction = TaskMessagesDomain.effect(
  'submit user answer as action',
  {
    handler: async ({ taskId, messageId, actionId }) => {
      if (!taskId) throw new Error('No taskId');
      const response = await consumeUserTaskActionRequest(
        taskId,
        messageId,
        actionId
      );
      return response.data.data;
    },
  }
);
