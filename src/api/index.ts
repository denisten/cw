import { getUrl } from './get-url';
import { getProfile } from './get-profile';
import { logoutRequest } from './logout';
import { getWsToken } from './get-ws-token';
import { getAllProgress } from './get-all-progress';
import { progressRefresh } from './progress-refresh';

export enum apiRoutes {
  GET_INCOMES = '/api/users/current/products/incomes',
  DEV_LOGIN = '/api/dev/login',
  GET_URL = '/api/auth/url',
  USER_DATA = '/api/users/current',
  USER_ACCOUNT = '/api/users/current/account',
  CHAT_SESSION = '/api/users/current/tasks',
  CONSUME_USER_TASK_ACTION = '/api/users/current/tasks',
  GENERATE_TASKS = '/api/dev/tasks/generate',
  LOGOUT = '/api/auth/logout',
  GET_WS_TOKEN = '/api/ws/connection',
  WS_SUBSCRIBE = '/api/ws/subscribe',
  GET_ALL_PROGRESS = '/api/users/current/progress/current',
  PROGRESS_REFRESH = '/api/users/current/progress/refresh',
  PRODUCTS = '/api/users/current/products/',
  COMMIT_PROGRESS = '/progress/commit',
  GET_TASKS = '/api/users/current/tasks',
  REFRESH_BD = '/api/dev/refreshDb',
  COMMIT_INCOMES = '/incomes/commit',
  CENTRIFUGE = '/centrifugo/connection/websocket',
}

export {
  getUrl,
  getProfile,
  logoutRequest,
  getWsToken,
  getAllProgress,
  progressRefresh,
};
