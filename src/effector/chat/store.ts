import { ChatDomain } from './domain';
import {
  chatTaskSession,
  clearChat,
  consumeUserTaskAction,
  createMockupOfMessages,
  resetChatStore,
  initChatSession,
  pushBotMessageToCurrentChat,
} from './events';
import { IAction, IMessage, Sender } from '../../api/tasks-api/session';
import { TowersTypes } from '../towers-progress/store';
import { hideMarker, setMarker } from '../towers-marker/events';
import { MarkerTypes } from '../../components/markers';

const initChatData = {
  taskId: 0,
  blockId: 0,
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

export const ChatStore = ChatDomain.store<ITaskMessagesStore>(initStore)
  .on(initChatSession, (state, { towerTitle, taskId }) => ({
    ...state,
    [towerTitle]: {
      ...state[towerTitle],
      taskId,
    },
  }))
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
    const userAction = {
      text: data.currentAction.text,
      direction: Sender.FRONTEND,
    };
    if (data.ended) {
      return {
        ...state,
        [towerTitle]: {
          ...state[towerTitle],
          ended: true,
          actions: [],
          messages: [
            ...state[towerTitle].messages,
            userAction,
            ...data.messages,
          ],
        },
      };
    }
    return {
      ...state,
      [towerTitle]: {
        ...state[towerTitle],
        messages: [...state[towerTitle].messages, userAction, ...data.messages],
        actions: data.actions,
        blockId: data.blockId,
      },
    };
  })
  .on(clearChat, (state, { towerTitle }) => ({
    ...state,
    [towerTitle]: initChatData,
  }))
  .reset(resetChatStore);

chatTaskSession.done.watch(({ params: { towerTitle } }) => {
  hideMarker({ towerTitle, type: MarkerTypes.TASK });
  setMarker({ towerTitle, type: MarkerTypes.ACTIVE_TASK });
});

export interface ICurrentTowerChatStore {
  taskId: number;
  blockId: number;
  currentAction: {
    id: number;
    text: string;
  };
  messages: IMessage[];
  actions: IAction[];
  ended: boolean;
}

type ITaskMessagesStore = Record<TowersTypes, ICurrentTowerChatStore>;
