import Centrifuge from 'centrifuge';
import { getProfile } from '../get-profile';
import { getCookie } from '../../utils/get-cookie';
import { getWsToken } from '../get-ws-token';
import { apiRoutes } from '../index';
import { setUserSocket } from '../../effector/user-data/events';
import { addTowerProgressData } from '../../effector/towers-progress/events';

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
  setUserSocket(centrifuge);

  const { id } = await getProfile();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const subscription = centrifuge.subscribe('progress:updates#' + id, item => {
    addTowerProgressData(item.data);
  });
  centrifuge.on('disconnect', () => {
    subscription.unsubscribe();
  });
};
