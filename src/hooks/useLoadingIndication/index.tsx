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
          allImagesNumber !== loadedImagesNumber)
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
    if (imgCollection.length === 0 || !imgCollection) {
      setLoadingPercent(maxpercent);
    }
  };

  const converToPecent = () => {
    // TODO delete -1
    const persent = (loadedImagesNumber * maxpercent) / allImagesNumber - 1;
    setLoadingPercent(Number(persent.toFixed(0)) || 0);
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
