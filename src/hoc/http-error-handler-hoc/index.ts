import { errorParsingHOF } from '../../utils/error-handler';

export const withHandlingErrors = async (
  request: () => Promise<IwithHandlingErrors>
) => {
  try {
    const response = await request();
    return response;
  } catch (err) {
    errorParsingHOF(err.response.status);
    throw new Error('request error');
  }
};

interface IwithHandlingErrors {
  data: {
    url?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
  };
}
