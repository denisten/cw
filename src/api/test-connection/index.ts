import Centrifuge from 'centrifuge';
import { getProfile } from '../get-profile';
import { getCookie } from '../../utils/get-cookie';
import { getWsToken } from '../get-ws-token';
import { apiRoutes } from '../index';
import { fetchAllProductsData } from '../../effector/towers-progress/events';

const wsConnectionRoute =
  'ws://stage.cwmts.dev-stream.ru/centrifugo/connection/websocket';

export const testConnection = async () => {
  const centrifuge = new Centrifuge(wsConnectionRoute, {
    subscribeEndpoint: apiRoutes.WS_SUBSCRIBE,
    subscribeHeaders: {
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    },
  });
  const token = await getWsToken();
  centrifuge.setToken(token);
  centrifuge.connect();

  const { id } = await getProfile();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const subscription = centrifuge.subscribe('progress:updates#' + id, () => {
    //TODO: do smth with received message
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = fetchAllProductsData('');
  // console.log('its product data:', data);
};
