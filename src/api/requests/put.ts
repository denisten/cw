import axios, { AxiosResponse } from 'axios';
import { withHandlingErrors } from '../../hoc/http-error-handler-hoc';

export const put = <T, Y = {}>(url: string, data: Y | unknown = {}) => {
  return withHandlingErrors(
    (): Promise<AxiosResponse<T>> => {
      return axios.put(url, data);
    }
  );
};
