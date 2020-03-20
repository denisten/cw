import { errorParsingHOF } from '../../utils/error-handler';
import { AxiosResponse } from 'axios';

export const withHandlingErrors = async <T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<AxiosResponse<T>> => {
  try {
    return await request();
  } catch (err) {
    errorParsingHOF(err.response.status);
    throw new Error('request error');
  }
};
