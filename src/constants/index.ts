const daysNumInOneMonth = 31;

export const DaysNumArr: string[] = new Array(daysNumInOneMonth)
  .fill(0)
  .map((el, idx) => (el = String(idx + 1)));

export const MonthsStringArr = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];
const numberOfPreloaderTowerStates = 2;

export const zIndexForInheritOverlay = 2;
export const maxPersent = 100;
export const statusOk = 200;
export const delayBeforeUpdateTower = 2000;
export const delayBeforePreloaderOff = 1200;
export const preloaderTowersAnimationDuration = 200;
export const totalAnimationPreloaderTowerDuration =
  preloaderTowersAnimationDuration * numberOfPreloaderTowerStates;

export const minNameLength = 3,
  maxCityNameLength = 12,
  maxUserNameLength = 14;

export enum responseStates {
  SUCCESS = 'success',
}

export const coinMoveAnimationDuration = 1000;
