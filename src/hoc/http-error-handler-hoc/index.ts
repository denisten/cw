import { errorParsingHOF } from '../../utils/error-handler';
import { AxiosResponse } from 'axios';

export const withHandlingErrors = <T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<AxiosResponse<T>> => {
  try {
    return request();
  } catch (err) {
    errorParsingHOF(err.response.status);
    throw new Error('request error');
  }
};
