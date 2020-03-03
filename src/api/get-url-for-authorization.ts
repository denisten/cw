import axios from 'axios';
import { errorHandler } from '../utils/error-handler';

interface GetUrlProp {
  url: string;
}

export const httpRequestGet = async (url: string): Promise<GetUrlProp> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error.response.status);
    throw new Error('API Error');
  }
};
