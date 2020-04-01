import { useEffect, useRef } from 'react';

export const useScrollTo = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any,
  scrollCoords: number[],
  dependency: (string | number | boolean)[]
) => {
  const arrayRef = useRef<number[] | null>(null);
  const checkArrayDifference = (arrayOne: number[], arrayTwo: number[]) => {
    return arrayOne
      .filter(i => !arrayTwo.includes(i))
      .concat(arrayTwo.filter(i => !arrayOne.includes(i)));
  };
  const scrollToPosition = () => {
    node.style.scrollBehavior = 'smooth';
    node.scrollTo(...scrollCoords);
    node.style.scrollBehavior = '';
    arrayRef.current = scrollCoords;
  };
  useEffect(() => {
    if (arrayRef.current === null && node) {
      // first start
      scrollToPosition();
    } else if (
      arrayRef.current !== null &&
      node &&
      checkArrayDifference(arrayRef.current, scrollCoords).length !== 0
    ) {
      // значения в scrollCoords изменились
      scrollToPosition();
    }
  }, [...dependency, node, scrollCoords]);
};
