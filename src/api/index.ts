import { getUrl } from './get-url';
import { getProfile } from './get-profile';

export enum apiRoutes {
  GET_URL = '/api/auth/url',
  GET_PROFILE = 'api/users/current',
}

export { getUrl, getProfile };
