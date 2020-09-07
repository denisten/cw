import { useEffect } from 'react';
import { newImgLoaded } from '../../effector/preloader/events';

export const useHandleBackgroundOnload = (src: string) => {
  useEffect(() => {
    const image = new Image();
    image.onload = () => newImgLoaded();
    image.src = src;
  }, []);
};
