import { get } from '../../requests';
import { apiRoutes } from '../../index';

export const chatTaskSessionRequest = async (id: number) => {
  return await get<IChatTaskSessionRequest>(
    `${apiRoutes.CHAT_SESSION}/${id}/chat/session`
  );
};

export enum MessagesDirection {
  INCOMING = 'in',
  OUTGOING = 'out',
}

export interface IChatTaskSessionRequest {
  state: string;
  data: {
    masterMessageId: number;
    messages: IMessage[];
    actions: IAction[];
    ended: boolean;
  };
}

export interface IMessage {
  text: string;
  direction: MessagesDirection;
}

export interface IAction {
  id: number;
  text: string;
}
