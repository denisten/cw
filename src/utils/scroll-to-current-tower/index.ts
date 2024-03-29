import { RefObject } from 'react';

export const scrollToCurrentTower = (
  ref: RefObject<HTMLDivElement> | null | undefined,
  options: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  }
) => {
  ref && ref.current && ref.current.scrollIntoView(options);
};
