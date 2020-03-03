import axios from 'axios';
import { errorParsingHOF } from '../../../utils/error-handler';

interface GetUrlProp {
  data: { url: string };
}

export const withHandlingErrors = async (
  request: () => Promise<GetUrlProp>
) => {
  try {
    const a = await request();
    return a;
  } catch (err) {
    errorParsingHOF(err.response.status);
    throw new Error('asdf');
  }
};

export const get = (url: string) => {
  return withHandlingErrors(() => {
    return axios.get(url);
  });
};
