import { MissionsDomain } from './domain';
import { addMission } from './events';
import { TowersTypes } from '../towers-progress/store';

export enum TaskSubType {
  CHALLENGE = 'challenge',
  MISSIONS = 'missions',
  NBO = 'nbo',
  COSMETICS = 'cosmetics',
}

export enum TaskStatuses {
  DONE = 'done',
  NOT_DONE = 'notDone',
  IN_PROGRESS = 'inProgress',
}

const initStore: IMission[] = [
  {
    type: TaskSubType.COSMETICS,
    taskTitle: 'Продай кастрюлю',
    status: TaskStatuses.DONE,
    isAllowedToChange: true,
    towerTitle: TowersTypes.SMARTMED,
    description:
      'Бегай каждое утро и отмечай результаты, чтобы задание…было вылненоБегай каждое утро и отмечай результаты, чтобы задание…было вылнено',
    loot: {
      money: 100,
      energy: 100,
    },
  },
  {
    type: TaskSubType.NBO,
    taskTitle: 'Купи кастрюлю',
    status: TaskStatuses.NOT_DONE,
    isAllowedToChange: true,
    towerTitle: TowersTypes.MAIN_TOWER,
    description:
      'Бегай каждое утро и отмечай результаты, чтобы задание…было вылненоБегай каждое утро и отмечай результаты, чтобы задание…было вылнено',
    loot: {
      money: -100,
      energy: 200,
    },
  },
  {
    type: TaskSubType.CHALLENGE,
    taskTitle: 'Сделай 2000 шагов!',
    status: TaskStatuses.NOT_DONE,
    isAllowedToChange: true,
    towerTitle: TowersTypes.MUSIC,
    description:
      'Бегай каждое утро и отмечай результаты, чтобы задание…было вылненоБегай каждое утро и отмечай результаты, чтобы задание…было вылнено',
    loot: {
      money: 20,
      energy: -100,
    },
  },
  {
    type: TaskSubType.COSMETICS,
    taskTitle: 'Сделай селфи',
    status: TaskStatuses.DONE,
    isAllowedToChange: true,
    towerTitle: TowersTypes.MOBILE_NETWORK,
    description:
      'Бегай каждое утро и отмечай результаты, чтобы задание…было вылненоБегай каждое утро и отмечай результаты, чтобы задание…было вылнено',
    loot: {
      money: 100,
      energy: 100,
    },
  },
  {
    type: TaskSubType.NBO,
    taskTitle: 'Выложи пост',
    status: TaskStatuses.NOT_DONE,
    isAllowedToChange: true,
    towerTitle: TowersTypes.MAIN_TOWER,
    description:
      'Бегай каждое утро и отмечай результаты, чтобы задание…было вылненоБегай каждое утро и отмечай результаты, чтобы задание…было вылнено',
    loot: {
      money: 400,
      energy: -100,
    },
  },
  {
    type: TaskSubType.CHALLENGE,
    taskTitle: 'Сходи в магазин',
    status: TaskStatuses.DONE,
    isAllowedToChange: true,
    towerTitle: TowersTypes.SMARTMED,
    description:
      'Бегай каждое утро и отмечай результаты, чтобы задание…было вылненоБегай каждое утро и отмечай результаты, чтобы задание…было вылнено',
    loot: {
      money: 100,
      energy: 100,
    },
  },
  {
    type: TaskSubType.COSMETICS,
    taskTitle: 'Позвони другу',
    status: TaskStatuses.NOT_DONE,
    isAllowedToChange: true,
    towerTitle: TowersTypes.MAIN_TOWER,
    description:
      'Бегай каждое утро и отмечай результаты, чтобы задание…было вылненоБегай каждое утро и отмечай результаты, чтобы задание…было вылнено',
    loot: {
      money: 20,
      energy: 100,
    },
  },
];

export const MissionsStore = MissionsDomain.store(initStore).on(
  addMission,
  (state, payload) => {
    return {
      ...state,
      payload,
    };
  }
);

export interface IMission {
  type: TaskSubType;
  taskTitle: string;
  status: TaskStatuses;
  description: string;
  isAllowedToChange: boolean;
  towerTitle: TowersTypes;
  loot: {
    energy: number;
    money: number;
  };
}
