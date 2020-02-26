import axios from 'axios';
import { apiRoutes } from './index';

interface GetUrlProp {
  url: string;
}

export const getUrlForAuthorization = async (): Promise<GetUrlProp> => {
  try {
    const response = await axios.get(apiRoutes.GET_URL);
    return response.data;
  } catch {
    throw new Error('API error'); // TODO: надо позже добавить в стор флажок о наличие ошибок с текстом, и сделать popup с текстом ошибки.
  }
};
