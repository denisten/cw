const numberOfPreloaderTowerStates = 2;

export const zIndexForInheritOverlay = 2;
export const maxPercent = 100;
export const statusOk = 200;
export const delayBeforePreloaderOff = 1200;
export const preloaderTowersAnimationDuration = 150;
export const totalAnimationPreloaderTowerDuration =
  preloaderTowersAnimationDuration * numberOfPreloaderTowerStates;

export enum ResponseStatuses {
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export enum ElementOpacity {
  DISABLE = 0.3,
  ENABLE = 1,
}
