import { TaskMessagesDomain } from './domain';
import { chatTaskSessionRequest } from '../../api/tasks/session';
import { consumeUserTaskActionRequest } from '../../api/tasks/consume-user-task-action';
import { TowersTypes } from '../towers-progress/store';
import { ITaskMessagesStore } from './store';

export const chatTaskSession = TaskMessagesDomain.effect(
  'download chat session data',
  {
    handler: async ({ id, towerTitle }): Promise<IChatTaskSession> => {
      const request = await chatTaskSessionRequest(id);
      return { data: request.data.data, towerTitle };
    },
  }
);

interface IChatTaskSession {
  data: ITaskMessagesStore;
  towerTitle: TowersTypes;
}

export const createMockupOfMessages = TaskMessagesDomain.event();

export const consumeUserTaskAction = TaskMessagesDomain.effect(
  'submit user answer as action',
  {
    handler: async ({
      taskId,
      messageId,
      actionId,
      towerTitle,
    }): Promise<IConsumeUserTaskAction> => {
      if (!taskId) throw new Error('No taskId');
      const response = await consumeUserTaskActionRequest(
        taskId,
        messageId,
        actionId
      );
      return { data: response.data.data, towerTitle };
    },
  }
);

interface IConsumeUserTaskAction {
  data: ITaskMessagesStore;
  towerTitle: TowersTypes;
}

export const resetTaskMessagesStore = TaskMessagesDomain.event();
