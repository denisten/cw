import { get } from '../../requests';
import { apiRoutes } from '../../index';
import { ICurrentTowerChatStore } from '../../../effector/chat/store';

export const chatTaskSessionRequest = async (id: number) => {
  return await get<IChatTaskSessionRequest>(
    `${apiRoutes.CHAT_SESSION}/${id}/chat/session`
  );
};
export const chatTaskSessionRetryRequest = async (id: number) => {
  return await get<IChatTaskSessionRequest>(
    `${apiRoutes.CHAT_SESSION}/${id}/chat/session/retry`
  );
};

export enum Sender {
  FRONTEND = 'in',
  BACKEND = 'out',
}

export interface IChatTaskSessionRequest {
  state: string;
  data: ICurrentTowerChatStore;
}

export interface IMessage {
  text: string;
  direction: Sender;
}

export interface IAction {
  id: number;
  text: string;
}
