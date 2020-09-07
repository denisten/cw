import { PreloaderDomain } from './domain';
import {
  newImgLoaded,
  saveFRRImgQuantity,
  scoreSuccessRequests,
  setStartLoading,
} from './events';

export enum Browsers {
  CHROME = 'Chrome',
  FIREFOX = 'Firefox',
  IE = 'MSIE',
  EDGE = 'Edge',
  SAFARI = 'Safari',
  OPERA = 'Opera',
  YA = 'YaBrowser',
}

const iniStore: IPreloaderStore = {
  requestsQuantity: 5,
  resolvedRequestsQuantity: 0,
  loadingStarted: false,
  FRRLoadedImgQuantityLeft: Number.MAX_SAFE_INTEGER,
};

const recalculateResolvedRequestsQuantity = (
  resolvedRequests: number,
  requestsQuantity: number
) =>
  resolvedRequests < requestsQuantity ? resolvedRequests + 1 : resolvedRequests;

export const PreloaderStore = PreloaderDomain.store(iniStore)
  .on(scoreSuccessRequests, state => {
    const newValue = recalculateResolvedRequestsQuantity(
      state.resolvedRequestsQuantity,
      state.requestsQuantity
    );
    return {
      ...state,
      resolvedRequestsQuantity: newValue,
    };
  })
  .on(setStartLoading, state => ({
    ...state,
    loadingStarted: true,
  }))
  .on(newImgLoaded, state => ({
    ...state,
    FRRLoadedImgQuantityLeft: state.FRRLoadedImgQuantityLeft - 1,
  }))
  .on(saveFRRImgQuantity, (state, payload) => ({
    ...state,
    FRRLoadedImgQuantityLeft: payload,
  }));

interface IPreloaderStore {
  requestsQuantity: number;
  resolvedRequestsQuantity: number;
  loadingStarted: boolean;
  FRRLoadedImgQuantityLeft: number;
}
