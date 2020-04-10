import { useState, useEffect } from 'react';

export const useImageLoading = () => {
  const [allImageCount, setAllImageCount] = useState(0);
  const [loadedImgCount, setLoadedImgCount] = useState(0);

  const parseImageLoaded = () => {
    const imgCollection = document.querySelectorAll('img');
    for (let index = 0; index < imgCollection.length; index++) {
      const image = imgCollection[index];
      if (image.complete && allImageCount !== loadedImgCount) {
        setLoadedImgCount(loadedImgCount + 1);
        break;
      }
    }
  };

  const getAllImagesCollection = () => {
    const imgs = document.querySelectorAll('img');
    setAllImageCount(imgs.length);
  };
  useEffect(() => {
    document.addEventListener('DOMContentLoaded', getAllImagesCollection);
    return () => {
      document.removeEventListener('DOMContentLoaded', getAllImagesCollection);
    };
  }, []);
  useEffect(() => {
    parseImageLoaded();
  }, [allImageCount, loadedImgCount]);

  return { loadedImgCount, allImageCount };
};
