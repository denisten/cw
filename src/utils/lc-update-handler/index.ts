import { editIsAuthorizedFlag } from '../../effector/app-condition/events';

export const lcUpdateHandler = () => {
  editIsAuthorizedFlag(true);
  // const token = localStorage.getItem(authCookieKey);
  // const checkToken = await axios.post('/checkToken', { token });
  // if (!checkToken) {
  //   localStorage.removeItem(authCookieKey);
  // } TODO: надо сделать метод для проверки актуальности полученного токена
};
