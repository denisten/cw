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

const cityMtsDomain = 'city.mts.ru';

const centrifugeUrl = '/ws/connection/websocket';

const wsConnectionProtocol =
  (window.location.hostname !== cityMtsDomain ? 'ws' : 'wss') + '://';

const wsConnectionRoute =
  wsConnectionProtocol + window.location.host + centrifugeUrl;

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

  const subscription = centrifuge.subscribe(
    'progress:updates#' + userId,
    item => {
      const towerTitles = Object.keys(item.data) as TowersTypes[];
      const towerData = item.data as TowersProgressStoreType;
      towerTitles.forEach(tower =>
        addTowerProgressData({
          towerTitle: tower,
          levelOnServer: towerData[tower].level.level,
          points: towerData[tower].points,
        })
      );
    }
  );
  centrifuge.on('disconnect', () => {
    subscription.unsubscribe();
  });
};
