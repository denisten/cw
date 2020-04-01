import { RefObject } from 'react';

export const scrollToCurrentTower = (
  ref: RefObject<HTMLDivElement> | null | undefined
) => {
  // console.log(ref);
  // debugger;
  if (ref && ref.current) {
    // console.log('inside scroll');
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }
};
