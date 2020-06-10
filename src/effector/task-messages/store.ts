import { TaskMessagesDomain } from './domain';
import { chatTaskSession, consumeUserTaskAction } from './events';
import { IAction, IMessage, MessagesDirection } from '../../api/tasks/session';

const initStore = {
  messages: [],
  actions: [],
  masterMessageId: 0,
  ended: true,
};

export const TaskMessagesStore = TaskMessagesDomain.store<ITaskMessagesStore>(
  initStore
)
  .on(chatTaskSession.doneData, (_, payload) => payload)
  .on(consumeUserTaskAction.doneData, (state, payload) => {
    if (payload.ended) {
      return state;
    }
    const userAction = {
      text: payload.currentAction.text,
      direction: MessagesDirection.IN,
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
