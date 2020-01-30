import { useEffect } from 'react';

export const useScrollTo = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any,
  scrollCoords: number[],
  isExtraTowerInfoModalOpen: boolean
) => {
  useEffect(() => {
    if (node) {
      node.scrollTo(...scrollCoords);
    }
  }, [isExtraTowerInfoModalOpen]);
};
