import axios from 'axios';
import { apiRoutes } from './index';
import { dispatchErrorEvent } from '../effector/error-boundary-store/events';

interface GetUrlProp {
  url: string;
}

export const getUrlForAuthorization = async (): Promise<GetUrlProp> => {
  try {
    const response = await axios.get(apiRoutes.GET_URL);
    return response.data;
  } catch {
    dispatchErrorEvent({ errorFlag: true, text: 'Cant get authData' });
    throw new Error('API error'); // TODO: надо позже добавить в стор флажок о наличие ошибок с текстом, и сделать popup с текстом ошибки.
  }
};
