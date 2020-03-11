import { getUrl } from './get-url';
import { getProfile } from './get-profile';
import { logout } from './logout';

export enum apiRoutes {
  GET_URL = '/api/auth/url',
  GET_PROFILE = 'api/users/current',
  LOGOUT = 'api/auth/logout',
  UPDATE_DATA = 'api/users/current',
}

export { getUrl, getProfile, logout };
