import { useState, useEffect } from 'react';
import { maxPercent } from '../../constants';

export const useCalculateLoadingProgress = () => {
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

  const convertToPercent = () => {
    const percent = (loadedImagesNumber * maxPercent) / allImagesNumber || 0;
    if (percent >= maxPercent) {
      setLoadingPercent(maxPercent);
    } else {
      setLoadingPercent(Number(percent.toFixed(0)) || 0);
    }
  };

  const markAllResourcesAsLoaded = () => {
    setLoadingPercent(maxPercent);
  };

  useEffect(() => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAllImages);
    } else {
      checkAllImages();
    }

    window.addEventListener('load', markAllResourcesAsLoaded);

    return () => {
      document.removeEventListener('DOMContentLoaded', checkAllImages);
      window.removeEventListener('load', markAllResourcesAsLoaded);
    };
  }, []);

  useEffect(() => {
    parseWhenImageLoaded();
    convertToPercent();
  }, [allImagesNumber, loadedImagesNumber]);

  return loadingPercent;
};
