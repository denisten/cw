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

let wsProxyUrl = '';
const wsUrlLocalDevelopment = 'web.cwmts.dev-stream.ru';

if (window.location.hostname === wsUrlLocalDevelopment) {
  wsProxyUrl = 'stage.cwmts.dev-stream.ru';
}
const centrifugeUrl =
  window.location.hostname === 'dev.city.mts.ru'
    ? '/ws/connection/websocket'
    : apiRoutes.CENTRIFUGE;
const wsConnectionRoute =
  'ws://' + (wsProxyUrl || window.location.hostname) + centrifugeUrl;
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
      const towerTitless = Object.keys(item.data) as TowersTypes[];
      const towerDatas = item.data as TowersProgressStoreType;
      towerTitless.forEach(tower =>
        addTowerProgressData({
          towerTitle: tower,
          levelOnServer: towerDatas[tower].level.level,
        })
      );
    }
  );
  centrifuge.on('disconnect', () => {
    subscription.unsubscribe();
  });
};
