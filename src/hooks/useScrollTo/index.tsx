import { useEffect, useRef } from 'react';

export const useScrollTo = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any,
  scrollCoords: number[],
  dependency: (string | number | boolean)[]
) => {
  const arrayRef = useRef<number[] | null>(null);
  const checkArrayDifference = (arrayOne: number[], arrayTwo: number[]) => {
    return (
      arrayOne
        .filter(i => !arrayTwo.includes(i))
        .concat(arrayTwo.filter(i => !arrayOne.includes(i))).length !== 0
    );
  };

  const scrollToPosition = () => {
    node.style.scrollBehavior = 'smooth';
    node.scrollTo(...scrollCoords);
    node.style.scrollBehavior = '';
    arrayRef.current = scrollCoords;
  };

  useEffect(() => {
    if (!arrayRef.current && node) {
      scrollToPosition();
    } else if (
      arrayRef.current &&
      node &&
      checkArrayDifference(arrayRef.current, scrollCoords)
    ) {
      scrollToPosition();
    }
  }, [...dependency, node, scrollCoords]);
};
