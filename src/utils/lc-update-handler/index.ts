import axios from 'axios';
import { AuthCookieKey } from '../../components/auth-landing-page';

export const lcUpdateHandler = async () => {
  const token = localStorage.getItem(AuthCookieKey);
  const checkToken = await axios.post('/checkToken', { token });
  if (!checkToken) {
    localStorage.removeItem(AuthCookieKey);
  }
};
