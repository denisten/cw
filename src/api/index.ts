import { getUrl } from './get-url';
import { getProfile } from './get-profile';
import { logout } from './logout';
import { getWsToken } from './get-ws-token';
import { getAllProgress } from './get-all-progress';

export enum apiRoutes {
  GET_URL = '/api/auth/url',
  GET_PROFILE = 'api/users/current',
  LOGOUT = 'api/auth/logout',
  UPDATE_DATA = 'api/users/current',
  GET_WS_TOKEN = '/api/ws/connection',
  WS_SUBSCRIBE = '/api/ws/subscribe',
  GET_ALL_PROGRESS = 'api/progress/current',
}

export { getUrl, getProfile, logout, getWsToken, getAllProgress };
