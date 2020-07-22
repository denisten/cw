import Centrifuge from 'centrifuge';
import { getCookie } from '../../utils/get-cookie';
import { getWsToken } from '../get-ws-token';
import { apiRoutes } from '../index';
import { setUserSessionSocket } from '../../effector/user-data/events';
import { addTowerProgressData } from '../../effector/towers-progress/events';
import {
  TowersTypes,
  TowersProgressStoreType,
} from '../../effector/towers-progress/store';
import { getWorldState } from '../get-world-state';
import { setTaskId } from '../../effector/chat/events';
import { timerClosure } from '../../utils/timer-closure';
import { fetchTasks } from '../../effector/missions-store/events';

import { markerHandler } from '../../utils/marker-handler';
import { TaskStatuses, IGetTasks } from '../../effector/missions-store/store';

const centrifugeUrl = '/ws/connection/websocket';

const wsConnectionRoute = 'ws://' + window.location.host + centrifugeUrl;
const numberOfSubscriptions = 2;

export const openWsConnection = async (userId: number) => {
  const centrifuge = new Centrifuge(wsConnectionRoute, {
    subscribeEndpoint: apiRoutes.WS_SUBSCRIBE,
    subscribeHeaders: {
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    },
  });
  const token = await getWsToken();
  centrifuge.setToken(token);
  centrifuge.connect();
  setUserSessionSocket(centrifuge);
  let numberOfActiveSubscriptions = 0;

  const checkActiveSubscriptions = () => {
    numberOfActiveSubscriptions += 1;
    if (numberOfActiveSubscriptions === numberOfSubscriptions) {
      getWorldState();
    }
  };

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
      const userTasks = items.data.userTasks.map(el => {
        if (el.status !== TaskStatuses.CREATED) {
          setTaskId({
            towerTitle: el.task.content.product.slug,
            taskId: el.id,
          });
        }
        if (el.expireInSeconds) {
          el.taskTimer = timerClosure(el.expireInSeconds);
        }
        return el;
      });
      fetchTasks({ userTasks });
      markerHandler();
    }
  );

  progressSubscription.on('subscribe', () => checkActiveSubscriptions());
  tasksSubscription.on('subscribe', () => checkActiveSubscriptions());
  centrifuge.on('disconnect', () => {
    progressSubscription && progressSubscription.unsubscribe();
    tasksSubscription && tasksSubscription.unsubscribe();
  });
};
