import { useEffect } from 'react';
import { maxPercent } from '../../components/markers/timer';
import { UPGRADABLE } from '../../UI/progress-bar';

export const useEditProgressbarClassname = (
  node: Element | null,
  progress: number
) => {
  useEffect(() => {
    if (node) {
      if (progress && progress >= maxPercent) {
        node.classList.add(UPGRADABLE);
      } else if (progress && progress < maxPercent) {
        node.classList.remove(UPGRADABLE);
      }
    }
    return () => {
      node && node.classList.remove(UPGRADABLE);
    };
  }, [progress]);
};
