import { useState, useEffect } from 'react';
import { maxPercent } from '../../constants';
import { propEq, ifElse } from 'ramda';

export const useCalculateLoadingProgress = (
  isAuthorized: boolean,
  currentQuatitySuccessRequests: number,
  quatityRequests: number,
  startLoading: boolean
) => {
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

  const setPercentWithRequest = () => {
    const percent =
      ((currentQuatitySuccessRequests * maxPercent) / quatityRequests +
        (loadedImagesNumber * maxPercent) / allImagesNumber) /
      2;

    if (percent >= maxPercent) {
      setLoadingPercent(maxPercent);
    } else {
      setLoadingPercent(Number(percent.toFixed(0)) || 0);
    }
  };

  const setPercentWithImgLoaded = () => {
    const percent = (loadedImagesNumber * maxPercent) / allImagesNumber || 0;
    if (percent >= maxPercent) {
      setLoadingPercent(maxPercent);
    } else {
      setLoadingPercent(Number(percent.toFixed(0)) || 0);
    }
  };

  const convertToPercent = () => {
    // const percent = (loadedImagesNumber * maxPercent) / allImagesNumber || 0;
    if (isAuthorized) {
      setPercentWithRequest();
    } else {
      setPercentWithImgLoaded();
    }
  };

  const checkState = propEq('readyState', 'loading');
  const add = () =>
    document.addEventListener('DOMContentLoaded', checkAllImages);

  useEffect(() => {
    ifElse(checkState, add, checkAllImages)(document);

    return () => {
      document.removeEventListener('DOMContentLoaded', checkAllImages);
    };
  }, []);

  useEffect(() => {
    if (startLoading) {
      parseWhenImageLoaded();
      convertToPercent();
    }
  }, [
    allImagesNumber,
    loadedImagesNumber,
    currentQuatitySuccessRequests,
    startLoading,
  ]);

  return loadingPercent;
};
