import { PreloaderDomain } from './domain';
import { scoreSuccessRequests, setStartLoading } from './events';

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
  requestsQuantity: 6,
  resolvedRequestsQuantity: 0,
  loadingStarted: false,
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
  }));

interface IPreloaderStore {
  requestsQuantity: number;
  resolvedRequestsQuantity: number;
  loadingStarted: boolean;
}
