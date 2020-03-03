import axios from 'axios';
import { apiRoutes, errorCodes } from './index';
import { dispatchErrorEvent } from '../effector/error-boundary-store/events';

type AxiosError = {
  response: {
    status: number;
  };
};

export const getUrlForAuthorization = async (): Promise<string> => {
  let responseString = '';
  await axios
    .get(apiRoutes.GET_URL)
    .then(response => (responseString = response.data.url))
    .catch((error: AxiosError) => {
      responseString = 'fail';
      dispatchErrorEvent({
        errorFlag: true,
        text: errorCodes[`CODEERROR_${error.response.status}`],
      });
    });
  return responseString;
};
