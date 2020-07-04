import { TaskMessagesDomain } from './domain';
import {
  chatTaskSession,
  clearChat,
  consumeUserTaskAction,
  createMockupOfMessages,
  resetTaskMessagesStore,
  setTaskId,
  pushBotMessageToCurrentChat,
} from './events';
import { IAction, IMessage, Sender } from '../../api/tasks/session';
import { TowersTypes } from '../towers-progress/store';

const initChatData = {
  taskId: 0,
  masterMessageId: 0,
  currentAction: {
    id: 0,
    text: '',
  },
  messages: [],
  actions: [],
  ended: true,
};

const initStore = {
  [TowersTypes.ROAMING]: initChatData,
  [TowersTypes.MAIN_TOWER]: initChatData,
  [TowersTypes.LIBRARY]: initChatData,
  [TowersTypes.MUSIC]: initChatData,
  [TowersTypes.SMARTMED]: initChatData,
  [TowersTypes.MARVIN]: initChatData,
  [TowersTypes.OBSERVATORY]: initChatData,
  [TowersTypes.THEATER]: initChatData,
  [TowersTypes.TV]: initChatData,
  [TowersTypes.BANK]: initChatData,
  [TowersTypes.AUTO]: initChatData,
  [TowersTypes.CASHBACK]: initChatData,
  [TowersTypes.CONNECT]: initChatData,
  [TowersTypes.FITNESS]: initChatData,
  [TowersTypes.GOODOK]: initChatData,
  [TowersTypes.HOME_INTERNET]: initChatData,
  [TowersTypes.IGROTEKA]: initChatData,
  [TowersTypes.LIVE_ARENA]: initChatData,
  [TowersTypes.MOBILE_NETWORK]: initChatData,
  [TowersTypes.MY_MTS]: initChatData,
  [TowersTypes.PARTNER_ONE]: initChatData,
  [TowersTypes.PARTNER_TWO]: initChatData,
  [TowersTypes.PARTNER_THREE]: initChatData,
  [TowersTypes.POISK]: initChatData,
  [TowersTypes.SHOP]: initChatData,
  [TowersTypes.SPUTNIK]: initChatData,
  [TowersTypes.UNIVERSITY]: initChatData,
  [TowersTypes.WASD_TV]: initChatData,
};

const mockupOfMessages = [
  { text: 'Сообщение от бота', direction: Sender.BACKEND },
  { text: 'Сообщение от бота #2', direction: Sender.BACKEND },
];

export const TaskMessagesStore = TaskMessagesDomain.store<ITaskMessagesStore>(
  initStore
)
  .on(setTaskId, (state, { towerTitle, taskId }) => {
    return {
      ...state,
      [towerTitle]: {
        ...state[towerTitle],
        taskId,
      },
    };
  })
  .on(pushBotMessageToCurrentChat, (state, { message, towerTitle }) => ({
    ...state,
    [towerTitle]: {
      ...state[towerTitle],
      messages: [...state[towerTitle].messages, message],
    },
  }))
  .on(createMockupOfMessages, state => ({
    ...state,
    [TowersTypes.MAIN_TOWER]: {
      ...state[TowersTypes.MAIN_TOWER],
      messages: mockupOfMessages,
    },
  }))
  .on(chatTaskSession.doneData, (state, { towerTitle, data, taskId }) => ({
    ...state,
    [towerTitle]: {
      ...data,
      taskId,
    },
  }))
  .on(consumeUserTaskAction.doneData, (state, { data, towerTitle }) => {
    if (data.ended) {
      return {
        ...state,
        [towerTitle]: {
          ...state[towerTitle],
          ended: true,
          actions: [],
        },
      };
    }
    const userAction = {
      text: data.currentAction.text,
      direction: Sender.FRONTEND,
    };
    return {
      ...state,
      [towerTitle]: {
        ...state[towerTitle],
        messages: [...state[towerTitle].messages, userAction, ...data.messages],
        actions: data.actions,
        masterMessageId: data.masterMessageId,
      },
    };
  })
  .on(clearChat, (state, { towerTitle }) => ({
    ...state,
    [towerTitle]: initChatData,
  }))
  .reset(resetTaskMessagesStore);

export interface ICurrentTowerTaskMessagesStore {
  taskId: number;
  masterMessageId: number;
  currentAction: {
    id: number;
    text: string;
  };
  messages: IMessage[];
  actions: IAction[];
  ended: boolean;
}

type ITaskMessagesStore = Record<TowersTypes, ICurrentTowerTaskMessagesStore>;
