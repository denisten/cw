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
import { UserDataStore } from '../../effector/user-data/store';
// ws://web.cwmts.dev-stream.ru/centrifugo/connection/websocket
const wsConnectionRoute =
  'ws://' + window.location.hostname + apiRoutes.CENTRIFUGE;
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
  let userIdFromStore = UserDataStore.getState().id;
  if (!userIdFromStore) {
    const { id } = await getProfile();
    userIdFromStore = id;
  }
  const subscription = centrifuge.subscribe(
    'progress:updates#' + userIdFromStore,
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
