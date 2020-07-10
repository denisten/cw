import { useEffect } from 'react';

export const useEnableSizeMod = (
  callBack: () => void,
  isAuthorized: boolean
) => {
  useEffect(() => {
    isAuthorized && callBack();
  }, [isAuthorized]);
};
