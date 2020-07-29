import { RefObject, useEffect } from 'react';

export const useOutsideClickDetector = (
  refCollection: RefObject<HTMLDivElement>[],
  showOptions: boolean,
  callback: Function
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      refCollection.map(el => {
        if (el.current && el.current !== event.target && showOptions) {
          callback();
          return;
        }
      });
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refCollection, showOptions]);
};
