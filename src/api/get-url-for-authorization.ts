import axios from 'axios';
import { errorParsingHOF } from '../utils/error-handler';

interface GetUrlProp {
  data: { url: string };
}

export const httpRequestGet = async (url: string): Promise<GetUrlProp> => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    errorParsingHOF(error.response.status);
    throw new Error('API Error');
  }
};
