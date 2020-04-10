import { useState, useEffect } from 'react';

export const useImageOnLoadingCheck = () => {
  const [allImagesNumber, setAllImagesNumber] = useState(0);
  const [loadedImagesNumber, setLoadedImgCount] = useState(0);
  const [haveNotImg, setHaveNotImg] = useState(false);
  const [memoryCollection, setMemoryCollection] = useState<HTMLImageElement[]>(
    []
  );

  const parseWhenImageLoaded = () => {
    for (let index = 0; index < memoryCollection.length; index++) {
      const image = memoryCollection[index];
      if (image.complete && allImagesNumber !== loadedImagesNumber) {
        setMemoryCollection(memoryCollection.filter(item => item !== image));
        setLoadedImgCount(loadedImagesNumber + 1);
        break;
      }
    }
  };

  const checkAllImages = () => {
    const imgCollection = document.querySelectorAll('img');
    setAllImagesNumber(imgCollection.length);
    setMemoryCollection(Array.from(imgCollection));
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
