import { RefObject, useEffect } from 'react';

export const useOutsideClickDetector = (
  ref: RefObject<HTMLDivElement>,
  showOptions: boolean,
  callback: Function
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && ref.current !== event.target && showOptions) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, showOptions]);
};
