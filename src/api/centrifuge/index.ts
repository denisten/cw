import Centrifuge from 'centrifuge';
import { getCookie } from '../../utils/get-cookie';
import { getWsToken } from '../get-ws-token';
import { apiRoutes } from '../index';
import {
  setUserSessionSocket,
  getAccountData,
} from '../../effector/user-data/events';
import { addTowerProgressData } from '../../effector/towers-progress/events';
import {
  TowersTypes,
  TowersProgressStoreType,
} from '../../effector/towers-progress/store';
import { getWorldState } from '../get-world-state';
import { setTaskId } from '../../effector/chat/events';
import { timerClosure } from '../../utils/timer-closure';
import { saveTask } from '../../effector/tasks-store/events';

import { TaskStatuses, IGetTasks } from '../../effector/tasks-store/store';
import { scoreSuccessRequests } from '../../effector/preloader/events';
import { UserDataStore } from '../../effector/user-data/store';
import { saveMission } from '../../effector/missions-store/events';
import {
  IUserPurchasesSocketItem,
  fetchUserPurchases,
} from '../../effector/coupons/events';

const notSecuredProtocol = 'http:';
const securedWebSocketProtocol = 'wss://';
const notSecuredWebSocketProtocol = 'ws://';
const centrifugeUrl = '/ws/connection/websocket';

const wsProtocol =
  window.location.protocol === notSecuredProtocol
    ? notSecuredWebSocketProtocol
    : securedWebSocketProtocol;

const wsConnectionRoute = wsProtocol + window.location.host + centrifugeUrl;
const subscriptionQuantity = 2;
const reasonForReconnect = 'connection closed';

const createSubscriptions = (centrifuge: Centrifuge, userId: number) => {
  const progressSubscription = centrifuge.subscribe(
    'progress:updates#' + userId,
    item => {
      const towerTitles = Object.keys(item.data) as TowersTypes[];
      const towerData = item.data as TowersProgressStoreType;
      towerTitles.forEach(towerTitle => {
        const { income, level, levelUpPercentage } = towerData[
          towerTitle
        ].level;
        addTowerProgressData({
          towerTitle,
          income,
          newLevel: level,
          levelUpPercentage,
        });
      });
    }
  );
  const tasksSubscription = centrifuge.subscribe(
    'user-tasks:updates#' + userId,
    (items: IGetTasks) => {
      const userTasks = items.data.userTasks.filter(el => {
        if (el.status !== TaskStatuses.CREATED) {
          setTaskId({
            towerTitle: el.task.content.product.slug,
            taskId: el.id,
          });
        }
        if (el.expireInSeconds) {
          el.taskTimer = timerClosure(el.expireInSeconds);
        }
        return !el.userSubTasks.length;
      });
      const userMissions = items.data.userTasks.filter(
        el => el.userSubTasks.length
      );
      saveMission(userMissions);
      saveTask(userTasks);
    }
  );

  const userPurchasesSubscription = centrifuge.subscribe(
    'user-purchases:updates#' + userId,
    (items: IUserPurchasesSocketItem) => {
      fetchUserPurchases(items.data);
    }
  );

  const getBalanceSubscription = centrifuge.subscribe(
    'user-account:updates#' + userId,
    (items: IBalance) => {
      getAccountData(items.data.balance);
    }
  );

  return {
    progressSubscription,
    tasksSubscription,
    userPurchasesSubscription,
    getBalanceSubscription,
  };
};

export const openWsConnection = async () => {
  const { id: userId } = UserDataStore.getState();
  const centrifuge = new Centrifuge(wsConnectionRoute, {
    subscribeEndpoint: apiRoutes.WS_SUBSCRIBE,
    subscribeHeaders: {
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    },
  });
  const token = await getWsToken();
  if (!token) return;
  centrifuge.setToken(token);
  centrifuge.connect();
  setUserSessionSocket(centrifuge);
  let activeSubscriptionsQuantity = 0;

  const checkActiveSubscriptions = async () => {
    activeSubscriptionsQuantity += 1;
    if (activeSubscriptionsQuantity === subscriptionQuantity) {
      await getWorldState();
      scoreSuccessRequests();
    }
  };

  const {
    progressSubscription,
    tasksSubscription,
    userPurchasesSubscription,
    getBalanceSubscription,
  } = createSubscriptions(centrifuge, userId);

  progressSubscription.on('subscribe', () => checkActiveSubscriptions());
  tasksSubscription.on('subscribe', () => checkActiveSubscriptions());
  centrifuge.on('disconnect', e => {
    progressSubscription && progressSubscription.unsubscribe();
    tasksSubscription && tasksSubscription.unsubscribe();
    userPurchasesSubscription && userPurchasesSubscription.unsubscribe();
    getBalanceSubscription && getBalanceSubscription.unsubscribe();
    if (e.reason === reasonForReconnect && e.reconnect) {
      openWsConnection();
    }
  });
};

interface IBalance {
  data: {
    balance: number;
  };
}

const a = {
  state: 'string',
  data: {
    userTasks: [
      {
        id: 0,
        status: 'string',
        expireAt: 'string',
        expireInSeconds: 0,
        task: {
          // еще один уровень вложенности не нужен
          id: 0, // убрать
          parentId: 0, // надо чтобы он показывал на своего родителя (id миссии). ща он указывает на task.content.id
          content: {
            // еще один уровень вложенности не нужен
            id: 0, // убрать
            taskType: {
              // переместить на верхний уровень, где id, status, expireAt итд
              id: 0, // айдишник нам не нужен, используем только slug
              slug: 'string',
              name: 'string',
            },
            product: {
              id: 0, // айдишник не используем
              name: 'string',
              slug: 'string',
              description: 'string', // это не нужно
            },
            logo: {
              // всю инфу из лого можно выпилить, мы ей не пользуемся
              id: 0,
              content: 'string',
            },
            name: 'string', // переименовать в title
            legend: 'string', // если это краткое описание, то оставляем
            description: 'string', // если это полное описание, то тоже оставляем
          },
          priorityNumber: 0, // что это?)
          energy: 0, // надо сделать объект reward : {energy: number, money: number}
          reward: 0, // переместить
          availabilityTime: 0, // не используем
          executionTime: 0, // не используем
          betweenTasksTime: 0, // не используем
        },
      },
    ],
    total: 0, // если в userTasks будет лежать список задач, то отдельно выводить total и userTasks не нужно, можно в data положить сразу список задач
  },
};
