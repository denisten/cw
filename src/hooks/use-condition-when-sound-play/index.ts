import { useEffect } from 'react';

export const useConditionWhenSoundPlay = <T>(
  condition: boolean,
  playCallBack: () => void,
  dependence: T
) => {
  useEffect(() => {
    condition && playCallBack();
  }, [dependence]);
};
