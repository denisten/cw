import { PreloaderDomain } from './domain';

export const scoreSuccessRequests = PreloaderDomain.event(
  'calculate success requests'
);
export const newImgLoaded = PreloaderDomain.event(
  'loaded new First Render Require Img'
);
export const saveFRRImgQuantity = PreloaderDomain.event<number>();

export const setStartLoading = PreloaderDomain.event(
  'calculate success requests'
);
