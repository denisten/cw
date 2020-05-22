import axios, { AxiosResponse } from 'axios';
import { withHandlingErrors } from '../../hoc/http-error-handler-hoc';

export const patch = <T, U>(url: string, data: U) => {
  return withHandlingErrors(
    (): Promise<AxiosResponse<T>> => {
      return axios.patch(url, data);
    }
  );
};
