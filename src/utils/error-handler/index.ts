import { coughtError } from '../../effector/error-boundary-store/events';
import { errorCodes } from './error-codes';

export const errorParsingHOF = (errorCode: number) => {
  coughtError({
    text: errorCodes[errorCode],
  });
};
