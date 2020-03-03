import { dispatchErrorEvent } from '../../effector/error-boundary-store/events';
import { errorCodes } from './error-codes';

export const errorParsingHOF = (errorCode: number) => {
  dispatchErrorEvent({
    text: errorCodes[`CODEERROR_${errorCode}`],
  });
};
