import { RefObject } from 'react';

export const scrollToCurrentTower = (
  ref: RefObject<HTMLDivElement> | null | undefined
) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }
};
