import axios from 'axios';
import { withHandlingErrors } from '../../../hoc/http-error-handler-hoc';

export const get = (url: string) => {
  return withHandlingErrors(() => {
    return axios.get(url);
  });
};
