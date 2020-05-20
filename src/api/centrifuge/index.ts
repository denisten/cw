import Centrifuge from 'centrifuge';
import { getProfile } from '../get-profile';
import { getCookie } from '../../utils/get-cookie';
import { getWsToken } from '../get-ws-token';
import { apiRoutes } from '../index';
import { setUserSessionSocket } from '../../effector/user-data/events';
import { addTowerProgressData } from '../../effector/towers-progress/events';
import {
  TowersTypes,
  TowersProgressStoreType,
} from '../../effector/towers-progress/store';

const wsConnectionRoute =
  'ws://stage.cwmts.dev-stream.ru/centrifugo/connection/websocket';

export const openWsConnection = async () => {
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

  const { id } = await getProfile();
  const subscription = centrifuge.subscribe('progress:updates#' + id, item => {
    const towerTitless = Object.keys(item.data) as TowersTypes[];
    const towerDatas = item.data as TowersProgressStoreType;
    towerTitless.forEach(tower =>
      addTowerProgressData({
        towerTitle: tower,
        levelOnServer: towerDatas[tower].level.level,
      })
    );
  });
  centrifuge.on('disconnect', () => {
    subscription.unsubscribe();
  });
};
