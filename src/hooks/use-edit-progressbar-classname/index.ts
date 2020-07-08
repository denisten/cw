import { useEffect } from 'react';
import { UPGRADABLE } from '../../UI/progress-bar';

export const useEditProgressbarClassname = (
  node: Element | null,
  needUpgrade: boolean
) => {
  useEffect(() => {
    if (node) {
      if (needUpgrade) {
        node.classList.add(UPGRADABLE);
      } else {
        node.classList.remove(UPGRADABLE);
      }
    }
    return () => {
      node && node.classList.remove(UPGRADABLE);
    };
  }, [needUpgrade]);
};
