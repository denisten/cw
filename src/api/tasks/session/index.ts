import { get } from '../../requests';
import { apiRoutes } from '../../index';

export const chatTaskSessionRequest = async (id: number) => {
  return await get<IChatTaskSessionRequest>(
    `${apiRoutes.CHAT_SESSION}/${id}/chat/session`
  );
};

export enum Sender {
  FRONTEND = 'in',
  BACKEND = 'out',
}

export interface IChatTaskSessionRequest {
  state: string;
  data: {
    masterMessageId: number;
    currentAction: {
      id: number;
      text: string;
    };
    messages: IMessage[];
    actions: IAction[];
    ended: boolean;
  };
}

export interface IMessage {
  text: string;
  direction: Sender;
}

export interface IAction {
  id: number;
  text: string;
}