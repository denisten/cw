import { getUrl } from './get-url';
import { getProfile } from './get-profile';
import { logout } from './logout';
import { getWsToken } from './get-ws-token';
import { getAllProgress } from './get-all-progress';
import { progressRefresh } from './progress-refresh';

export enum apiRoutes {
  GET_URL = '/api/auth/url',
  USER_DATA = 'api/users/current',
  GENERATE_TASKS = '/api/dev/tasks/generate',
  LOGOUT = 'api/auth/logout',
  UPDATE_DATA = 'api/users/current',
  GET_WS_TOKEN = '/api/ws/connection',
  WS_SUBSCRIBE = '/api/ws/subscribe',
  GET_ALL_PROGRESS = 'api/progress/current',
  PROGRESS_REFRESH = 'api/progress/refresh',
  PRODUCTS = '/api/products',
  COMMIT_PROGRESS = 'progress/commit',
  GET_TASKS = '/api/tasks',
  REFRESH_BD = '/api/dev/refreshDb',
}

export {
  getUrl,
  getProfile,
  logout,
  getWsToken,
  getAllProgress,
  progressRefresh,
};
