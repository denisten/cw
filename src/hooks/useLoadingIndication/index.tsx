import { useState, useEffect } from 'react';
const maxpercent = 100;
export const useLoadingIndication = () => {
  const [allImagesNumber, setAllImagesNumber] = useState(0);
  const [loadedImagesNumber, setLoadedImgCount] = useState(0);
  const [loadingPercent, setLoadingPercent] = useState(0);

  const parseWhenImageLoaded = () => {
    const imgCollection = Array.from(document.querySelectorAll('img')).filter(
      image => !image.hasAttribute('checked')
    );
    for (let index = 0; index < imgCollection.length; index++) {
      const image = imgCollection[index];

      if (
        image.complete ||
        (image.getAttribute('data-testid') === 'lazy-image' &&
          allImagesNumber <= loadedImagesNumber)
      ) {
        image.setAttribute('checked', 'true');
        setLoadedImgCount(loadedImagesNumber + 1);
        break;
      }
    }
  };

  const checkAllImages = () => {
    const imgCollection = document.querySelectorAll('img');
    setAllImagesNumber(imgCollection.length);
  };

  const converToPecent = () => {
    const persent = (loadedImagesNumber * maxpercent) / allImagesNumber || 0;
    if (persent >= maxpercent) {
      setLoadingPercent(maxpercent);
    } else {
      setLoadingPercent(Number(persent.toFixed(0)) || 0);
    }
  };

  const markAllResoursesAsLoaded = () => {
    setLoadingPercent(maxpercent);
  };

  useEffect(() => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAllImages);
    } else {
      checkAllImages();
    }

    window.addEventListener('load', markAllResoursesAsLoaded);

    return () => {
      document.removeEventListener('DOMContentLoaded', checkAllImages);
      window.removeEventListener('load', markAllResoursesAsLoaded);
    };
  }, []);
  useEffect(() => {
    parseWhenImageLoaded();
    converToPecent();
  }, [allImagesNumber, loadedImagesNumber]);

  return {
    loadingPercent,
  };
};
