import { useEffect } from 'react';

enum divideNumber {
  WIDTH = 2.5,
  HEIGHT = 1.8,
}

export const useScrollTo = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any,
  towerCoords: number[],
  isExtraTowerInfoModalOpen: boolean
) => {
  useEffect(() => {
    if (node) {
      const [cordX, cordY] = towerCoords;
      const scrollContainerNode = node.container.current;
      if (scrollContainerNode)
        scrollContainerNode.scrollTo(
          cordX - window.innerWidth / divideNumber.WIDTH,
          cordY - window.innerHeight / divideNumber.HEIGHT
        );
    }
  }, [isExtraTowerInfoModalOpen]);
};
