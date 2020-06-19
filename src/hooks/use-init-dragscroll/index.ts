import { useEffect } from 'react';
import dragscroll from 'dragscroll';

export const useInitDragscroll = () => {
  useEffect(() => {
    dragscroll.reset();
  }, []);
};
