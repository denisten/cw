import { TaskMessagesDomain } from './domain';
import {
  chatTaskSessionRequest,
  chatTaskSessionRetryRequest,
} from '../../api/tasks/session';
import { consumeUserTaskActionRequest } from '../../api/tasks/consume-user-task-action';
import { TowersTypes } from '../towers-progress/store';
import { ICurrentTowerTaskMessagesStore } from './store';

export const chatTaskSession = TaskMessagesDomain.effect(
  'download chat session data',
  {
    handler: async ({
      id,
      towerTitle,
      retry = false,
    }): Promise<IChatTaskSession> => {
      if (retry) {
        const request = await chatTaskSessionRetryRequest(id);
        return { data: request.data.data, towerTitle, taskId: id };
      } else {
        const request = await chatTaskSessionRequest(id);
        return { data: request.data.data, towerTitle, taskId: id };
      }
    },
  }
);
export const createMockupOfMessages = TaskMessagesDomain.event();

export const setTaskId = TaskMessagesDomain.event<ISetTaskId>();

export const clearChat = TaskMessagesDomain.event<IClearChat>();

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

export const resetTaskMessagesStore = TaskMessagesDomain.event();

interface IConsumeUserTaskAction {
  data: ICurrentTowerTaskMessagesStore;
  towerTitle: TowersTypes;
}
interface ISetTaskId {
  taskId: number;
  towerTitle: TowersTypes;
}

interface IClearChat {
  towerTitle: TowersTypes;
}

interface IChatTaskSession {
  data: ICurrentTowerTaskMessagesStore;
  towerTitle: TowersTypes;
  taskId: number;
}
