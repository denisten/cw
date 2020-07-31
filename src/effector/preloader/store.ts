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
  quatityRequests: 6,
  currentQuatitySuccessRequests: 0,
  finishedRequest: false,
  startLoading: false,
};

export const PreloaderStore = PreloaderDomain.store(iniStore)
  .on(scoreSuccessRequests, state => {
    const stateClone = { ...state };
    if (stateClone.currentQuatitySuccessRequests < stateClone.quatityRequests) {
      stateClone.currentQuatitySuccessRequests =
        stateClone.currentQuatitySuccessRequests + 1;
    } else {
      stateClone.finishedRequest = true;
    }
    return stateClone;
  })
  .on(setStartLoading, state => ({
    ...state,
    startLoading: true,
  }));

interface IPreloaderStore {
  quatityRequests: number;
  currentQuatitySuccessRequests: number;
  finishedRequest: boolean;
  startLoading: boolean;
}
