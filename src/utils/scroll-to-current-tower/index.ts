import { RefObject } from 'react';
import { AppConditionStore } from '../../effector/app-condition/store';

export const scrollToCurrentTower = (
  ref: RefObject<HTMLDivElement> | null | undefined,
  options: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  }
) => {
  const { fullSizeMode } = AppConditionStore.getState();
  if (fullSizeMode) return;
  if (ref && ref.current) {
    ref.current.scrollIntoView(options);
  }
};
