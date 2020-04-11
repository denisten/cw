import { useState, useEffect } from 'react';

export const useImageOnLoadingCheck = () => {
  const [allImagesNumber, setAllImagesNumber] = useState(0);
  const [loadedImagesNumber, setLoadedImgCount] = useState(0);
  const [haveNotImg, setHaveNotImg] = useState(false);

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
      setHaveNotImg(true);
    }
  };

  useEffect(() => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAllImages);
    } else {
      checkAllImages();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', checkAllImages);
    };
  }, []);
  useEffect(() => {
    parseWhenImageLoaded();
  }, [allImagesNumber, loadedImagesNumber]);

  return { loadedImagesNumber, allImagesNumber, haveNotImg };
};
