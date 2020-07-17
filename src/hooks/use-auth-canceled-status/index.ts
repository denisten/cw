import { useEffect } from 'react';
import { errorStringsParsingHOF } from '../../utils/error-handler';

export const useAuthCanceledStatus = (authCancelledStatus: string) => {
  useEffect(() => {
    if (authCancelledStatus) {
      errorStringsParsingHOF(authCancelledStatus);
    }
  }, [authCancelledStatus]);
};
