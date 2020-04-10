import { useState, useEffect } from 'react';

export const useImageOnLoadingCheck = () => {
  const [allImageCount, setAllImageCount] = useState(0);
  const [loadedImgCount, setLoadedImgCount] = useState(0);
  const [haveNotImg, setHaveNotImg] = useState(false);

  const parseWhenImageLoaded = () => {
    const imgCollection = document.querySelectorAll('img');
    for (let index = 0; index < imgCollection.length; index++) {
      const image = imgCollection[index];
      if (image.complete && allImageCount !== loadedImgCount) {
        setLoadedImgCount(loadedImgCount + 1);
        break;
      }
    }
  };

  const checkAllImages = () => {
    const imgs = document.querySelectorAll('img');

    setAllImageCount(imgs.length);
    if (imgs.length === 0 || !imgs) {
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
  }, [allImageCount, loadedImgCount]);

  return { loadedImgCount, allImageCount, haveNotImg };
};
