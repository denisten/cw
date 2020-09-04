import { getUrl } from './get-url';
import { getProfile } from './get-profile';
import { logoutRequest } from './logout';
import { getWsToken } from './get-ws-token';
import { getAllProgress } from './get-all-progress';
import { progressRefresh } from './progress-refresh';

export enum apiRoutes {
  CLOSE_TUTORIAL = '/api/users/current/profile/tutorial/shown',
  CLOSE_SLIDER = '/api/users/current/profile/slider/shown',
  GET_INCOMES = '/api/users/current/products/incomes',
  PRODUCT_LEVEL_DATA = '/api/progress/levels',
  DEV_LOGIN = '/api/dev/login',
  GET_URL = '/api/auth/url',
  USER_DATA = '/api/users/current',
  SAVE_USER_DATA = '/api/users/current/profile',
  USER_ACCOUNT = '/api/users/current/account',
  CHAT_SESSION = '/api/users/current/tasks',
  CONSUME_USER_TASK_ACTION = '/api/users/current/tasks',
  LOGOUT = '/api/auth/logout',
  GET_WS_TOKEN = '/api/ws/connection',
  WS_SUBSCRIBE = '/api/ws/subscribe',
  GET_ALL_PROGRESS = '/api/users/current/progress/current',
  PROGRESS_REFRESH = '/api/users/current/progress/refresh',
  PRODUCTS = '/api/users/current/progress/products/',
  COMMIT_PROGRESS = '/commit',
  GET_TASKS = '/api/users/current/tasks',
  COMMIT_INCOMES = '/incomes/commit',
  GET_PURCHASES = '/api/users/current/purchases',
  BUY_COUPON = '/api/store/items/coupon-replace/buy',
  STORE_PURCHASES = '/api/store/purchases/',
  REDEEM = '/redeem',
  GET_WORLD_STATE = '/api/world/state',
  GET_SHOP_CATALOG = '/api/store/listing',
  STORE_ITEMS = '/api/store/items/',
  CURRENT_PRODUCTS = '/api/users/current/products/',
  GET_DESCRIPTIONS = '/api/products',
}

export {
  getUrl,
  getProfile,
  logoutRequest,
  getWsToken,
  getAllProgress,
  progressRefresh,
};
