import axios, { AxiosResponse } from 'axios';
import { withHandlingErrors } from '../../hoc/http-error-handler-hoc';

export const get = <T>(url: string) => {
  return withHandlingErrors(
    (): Promise<AxiosResponse<T>> => {
      return axios.get(url);
    }
  );
};
