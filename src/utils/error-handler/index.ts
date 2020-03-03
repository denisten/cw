import { dispatchErrorEvent } from '../../effector/error-boundary-store/events';
import { errorCodes } from './error-codes';

export const errorHandler = (errorCode: number) => {
  dispatchErrorEvent({
    errorFlag: true,
    text: errorCodes[`CODEERROR_${errorCode}`],
  });
};
