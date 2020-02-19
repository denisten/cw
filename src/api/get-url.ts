import axios, { AxiosResponse } from 'axios';
import { apiRoutes } from './index';

interface GetUrlProp {
  url: string;
}

export const getUrl = async (): Promise<GetUrlProp> => {
  const response = await axios.get(apiRoutes.GET_URL);

  return response.data;
};
