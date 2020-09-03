import Centrifuge from 'centrifuge';
import { getCookie } from '../../utils/get-cookie';
import { getWsToken } from '../get-ws-token';
import { apiRoutes } from '../index';
import {
  getAccountData,
  setUserSessionSocket,
} from '../../effector/user-data/events';
import { addTowerProgressData } from '../../effector/towers-progress/events';
import {
  TowersProgressStoreType,
  TowersTypes,
} from '../../effector/towers-progress/store';
import { getWorldState } from '../get-world-state';
import { IGetTasks } from '../../effector/tasks-store/store';
import { scoreSuccessRequests } from '../../effector/preloader/events';
import { UserDataStore } from '../../effector/user-data/store';
import {
  fetchUserPurchases,
  IUserPurchasesSocketItem,
} from '../../effector/coupons/events';
import { tasksHandler } from './handlers/tasks';
import { missionsHandler } from './handlers/missions';
import { receivedTasks } from '../../effector/app-condition/events';
import { AppConditionStore } from '../../effector/app-condition/store';

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
        const { factors } = towerData[towerTitle];
        addTowerProgressData({
          towerTitle,
          income,
          newLevel: level,
          levelUpPercentage,
          factors,
        });
      });
    }
  );
  const tasksSubscription = centrifuge.subscribe(
    'user-tasks:updates#' + userId,
    (items: IGetTasks) => {
      const tasks = items.data.filter(el => !el.userSubTasks.length);
      const missions = items.data.filter(el => el.userSubTasks.length);
      const { fetchedTasks } = AppConditionStore.getState();
      tasksHandler(tasks);
      missionsHandler(missions);
      !fetchedTasks && receivedTasks();
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
