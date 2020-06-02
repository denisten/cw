import { getCookie } from '../../utils/get-cookie';
import { editIsAuthorizedFlag } from '../../effector/app-condition/events';

export const authCookieKey = 'XSRF-TOKEN';

class CookieService {
  private _idToken = '';

  get idToken(): string | '' {
    if (!this._idToken) this.setToken();
    return this._idToken;
  }

  resetToken = () => {
    this._idToken = '';
    localStorage.removeItem(authCookieKey);
    editIsAuthorizedFlag(false);
  };

  setToken() {
    this._idToken = getCookie(authCookieKey) || '';
  }
}

const instance = new CookieService();
export { instance as CookieService };
