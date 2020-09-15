import { useEffect } from 'react';

export const usePlaySoundIf = <T>(
  condition: boolean,
  playCallBack: () => void,
  dependence: T
) => {
  useEffect(() => {
    // condition && playCallBack();
  }, [dependence]);
};
