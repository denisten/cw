import axios from 'axios';
import { apiRoutes } from './index';
import { errorHandler } from '../utils/error-handler';

type Response = {
  data: {
    url: string;
  };
};

export const httpRequestGet = async (
  url: string
): Promise<Response | Error> => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    errorHandler(error.response.status);
    throw new Error('API Error');
  }
};
