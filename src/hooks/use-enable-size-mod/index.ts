import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import { useEffect } from 'react';

export const useEnableSizeMod = (callBack: () => void) => {
  const { isAuthorized } = useStore(AppCondition);
  useEffect(() => {
    isAuthorized && callBack();
  }, [isAuthorized]);
};
