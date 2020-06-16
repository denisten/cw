import { TaskMessagesDomain } from './domain';
import {
  chatTaskSession,
  consumeUserTaskAction,
  createMockupOfMessages,
} from './events';
import { IAction, IMessage, Sender } from '../../api/tasks/session';

const initStore = {
  messages: [],
  actions: [],
  masterMessageId: 0,
  ended: true,
};

const mockupOfMessages = [
  { text: 'Сообщение от бота', direction: Sender.BACKEND },
  { text: 'Сообщение от бота #2', direction: Sender.BACKEND },
];

export const TaskMessagesStore = TaskMessagesDomain.store<ITaskMessagesStore>(
  initStore
)
  .on(createMockupOfMessages, state => ({
    ...state,
    messages: mockupOfMessages,
  }))
  .on(chatTaskSession.doneData, (_, payload) => payload)
  .on(consumeUserTaskAction.doneData, (state, payload) => {
    if (payload.ended) {
      return state;
    }
    const userAction = {
      text: payload.currentAction.text,
      direction: Sender.FRONTEND,
    };
    return {
      ...state,
      messages: [...state.messages, userAction, ...payload.messages],
      actions: payload.actions,
      masterMessageId: payload.masterMessageId,
    };
  });

interface ITaskMessagesStore {
  masterMessageId: number;
  messages: IMessage[];
  actions: IAction[];
  ended: boolean;
}
