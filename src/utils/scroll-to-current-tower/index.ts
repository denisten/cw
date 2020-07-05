import { RefObject } from 'react';
import { AppCondition } from '../../effector/app-condition/store';

export const scrollToCurrentTower = (
  ref: RefObject<HTMLDivElement> | null | undefined,
  options: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  }
) => {
  const { fullSizeMode } = AppCondition.getState();
  if (fullSizeMode) return;
  if (ref && ref.current) {
    ref.current.scrollIntoView(options);
  }
};
