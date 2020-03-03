import { errorParsingHOF } from '../../utils/error-handler';

export const withHandlingErrors = async (
  request: () => Promise<IwithHandlingErrors>
) => {
  try {
    const response = await request();
    return response;
  } catch (err) {
    errorParsingHOF(err.response.status);
    throw new Error('asdf');
  }
};

interface IwithHandlingErrors {
  data: { url: string };
}
