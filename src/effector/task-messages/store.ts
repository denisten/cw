import { TaskMessagesDomain } from './domain';
import { chatTaskSession, consumeUserTaskAction } from './events';
import { IAction, IMessage } from '../../api/tasks/session';

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
      return initStore;
    }
    return {
      ...state,
      messages: [...state.messages, ...payload.messages],
      actions: [...state.actions, ...payload.actions],
    };
  });

interface ITaskMessagesStore {
  masterMessageId: number;
  messages: IMessage[];
  actions: IAction[];
  ended: boolean;
}
