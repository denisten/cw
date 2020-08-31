import { ChatDomain } from './domain';
import {
  chatTaskSessionRequest,
  chatTaskSessionRetryRequest,
  IMessage,
} from '../../api/tasks-api/session';
import { consumeUserTaskActionRequest } from '../../api/tasks-api/consume-user-task-action';
import { TowersTypes } from '../towers-progress/store';
import { ICurrentTowerChatStore } from './store';

export const chatTaskSession = ChatDomain.effect('download chat session data', {
  handler: async ({
    id,
    towerTitle,
    retry = false,
  }): Promise<IChatTaskSession> => {
    let request;
    if (retry) {
      request = await chatTaskSessionRetryRequest(id);
    } else {
      request = await chatTaskSessionRequest(id);
    }
    return { data: request.data.data, towerTitle, taskId: id };
  },
});
export const createMockupOfMessages = ChatDomain.event();

export const setTaskId = ChatDomain.event<ISetTaskId>();

export const clearChat = ChatDomain.event<IClearChat>();

export const consumeUserTaskAction = ChatDomain.effect(
  'submit user answer as action',
  {
    handler: async ({
      taskId,
      blockId,
      actionId,
      towerTitle,
    }): Promise<IConsumeUserTaskAction> => {
      if (!taskId) throw new Error('No taskId');
      const response = await consumeUserTaskActionRequest(
        taskId,
        blockId,
        actionId
      );
      return { data: response.data.data, towerTitle };
    },
  }
);

export const resetChatStore = ChatDomain.event();
export const pushBotMessageToCurrentChat = ChatDomain.event<
  IBotMessageInCurrentChat
>();

interface IBotMessageInCurrentChat {
  message: IMessage;
  towerTitle: TowersTypes;
}

interface IConsumeUserTaskAction {
  data: ICurrentTowerChatStore;
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
  data: ICurrentTowerChatStore;
  towerTitle: TowersTypes;
  taskId: number;
}
