import { getCookie } from '../../utils/get-cookie';
import { editIsAuthorizedFlag } from '../../effector/app-condition/events';

export const authCookieKey = 'id_token';

class CookieService {
  private _idToken = '';

  get idToken(): string | undefined {
    return this._idToken || getCookie(authCookieKey);
  }

  resetToken = () => {
    this._idToken = '';
    localStorage.removeItem(authCookieKey);
    editIsAuthorizedFlag(false);
  };
}

const instance = new CookieService();
export { instance as CookieService };
