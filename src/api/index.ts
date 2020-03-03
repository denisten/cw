import { getUrlForAuthorization } from './get-url-for-authorization';

export enum apiRoutes {
  GET_URL = '/api/auth/url',
}

type ErrorCodeType = {
  [key: string]: string;
};

export const errorCodes: ErrorCodeType = {
  CODEERROR_404: 'Адрес не найден',
};

export { getUrlForAuthorization };
