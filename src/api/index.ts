import { getUrl } from './get-url';
import { getProfile } from './get-profile';
import { logout } from './logout';
import { getWsToken } from './get-ws-token';

export enum apiRoutes {
  GET_URL = '/api/auth/url',
  GET_PROFILE = 'api/users/current',
  LOGOUT = 'api/auth/logout',
  UPDATE_DATA = 'api/users/current',
  GET_WS_TOKEN = '/api/ws/connection',
  WS_SUBSCRIBE = '/api/ws/subscribe',
}

export { getUrl, getProfile, logout, getWsToken };
