import axios, { AxiosResponse } from 'axios';
import { withHandlingErrors } from '../../hoc/http-error-handler-hoc';

export const post = <T, Y = {}>(url: string, data?: Y) => {
  return withHandlingErrors(
    (): Promise<AxiosResponse<T>> => {
      return axios.post(url, data);
    }
  );
};
