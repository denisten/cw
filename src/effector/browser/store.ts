import { BrowserDomain } from './domain';
import { saveBrowserData } from './events';

export enum Browsers {
  CHROME = 'Chrome',
  FIREFOX = 'Firefox',
  IE = 'MSIE',
  EDGE = 'Edge',
  SAFARI = 'Safari',
  OPERA = 'Opera',
  YA = 'YaBrowser',
}

const iniStore: IBrowserStore = {
  browserName: undefined,
};

export const BrowserStore = BrowserDomain.store(iniStore).on(
  saveBrowserData,
  (state, payload) => ({ ...state, browserName: payload })
);

interface IBrowserStore {
  browserName: string | undefined;
}
