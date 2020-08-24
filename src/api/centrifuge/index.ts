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
      const userTasks = items.data.filter(el => {
        if (el.status !== TaskStatuses.CREATED) {
          setTaskId({
            towerTitle: el.productSlug,
            taskId: el.id,
          });
        }
        if (el.expireInSeconds) {
          el.taskTimer = timerClosure(el.expireInSeconds);
        }
        return !el.userSubTasks.length;
      });
      const userMissions = items.data.filter(el => el.userSubTasks.length);
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
