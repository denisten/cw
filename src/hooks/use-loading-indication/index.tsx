import { useState, useEffect, useRef } from 'react';
import { maxPercent } from '../../constants';
import { propEq, ifElse } from 'ramda';
const maxDelayBeforePreloaderOff = 100000;

export const useCalculateLoadingProgress = (
  isAuthorized: boolean,
  resolvedRequestsQuantity: number,
  requestsQuantity: number,
  loadingStarted: boolean,
  loadedFRRImgQuantity: number
) => {
  const [allImagesQuantity, setAllImagesQuantity] = useState(0);
  const [loadedImagesNumber, setLoadedImgCount] = useState(0);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [allResoursesLoaded, setAllResoursesLoaded] = useState(false);
  const timeout = useRef(0);
  useEffect(() => {
    timeout.current = setTimeout(() => {
      setAllResoursesLoaded(true);
      setLoadingPercent(maxPercent);
    }, maxDelayBeforePreloaderOff);
  }, []);

  const parseWhenImageLoaded = () => {
    const imgCollection = Array.from(document.querySelectorAll('img')).filter(
      image => !image.hasAttribute('checked')
    );
    for (let index = 0; index < imgCollection.length; index++) {
      const image = imgCollection[index];
      if (
        image.complete ||
        (image.getAttribute('data-testid') === 'lazy-image' &&
          allImagesQuantity <= loadedImagesNumber)
      ) {
        image.setAttribute('checked', 'true');
        setLoadedImgCount(loadedImagesNumber + 1);
        break;
      }
    }
  };

  const checkAllImages = () => {
    const imgCollection = document.querySelectorAll('img');
    setAllImagesQuantity(imgCollection.length);
  };

  const setPercentWithRequest = () => {
    const percent =
      ((resolvedRequestsQuantity * maxPercent) / requestsQuantity +
        (loadedImagesNumber * maxPercent) / allImagesQuantity) /
      2;

    if (percent >= maxPercent || !loadedFRRImgQuantity) {
      setLoadingPercent(maxPercent);
      setAllResoursesLoaded(true);
    } else {
      setLoadingPercent(Number(percent.toFixed(0)) || 0);
    }
  };

  const setPercentWithImgLoaded = () => {
    const percent = (loadedImagesNumber * maxPercent) / allImagesQuantity || 0;
    if (percent >= maxPercent || !loadedFRRImgQuantity) {
      setLoadingPercent(maxPercent);
      setAllResoursesLoaded(true);
    } else {
      setLoadingPercent(Number(percent.toFixed(0)) || 0);
    }
  };

  const convertToPercent = () => {
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
    if (loadingStarted && !allResoursesLoaded) {
      parseWhenImageLoaded();
      convertToPercent();
    }

    if (allResoursesLoaded) {
      clearTimeout(timeout.current);
    }
  }, [
    allImagesQuantity,
    loadedImagesNumber,
    resolvedRequestsQuantity,
    loadingStarted,
    allResoursesLoaded,
    loadedFRRImgQuantity,
  ]);

  return loadingPercent;
};
