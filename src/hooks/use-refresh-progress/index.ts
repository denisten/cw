import { useEffect, useRef } from 'react';
import { progressRefresh } from '../../api';
const millisecondsInSeconds = 1000;
export const useRefreshProgress = (timeOut: number, isAuthorized: boolean) => {
  const timeoutRef = useRef(0);

  useEffect(() => {
    if (timeOut && isAuthorized) {
      timeoutRef.current = setInterval(() => {
        progressRefresh();
      }, timeOut * millisecondsInSeconds);
    } else {
      clearInterval(timeoutRef.current);
    }

    return () => clearInterval(timeoutRef.current);
  }, [timeOut, isAuthorized]);
};
