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
export const maxPercent = 100;
export const statusOk = 200;
export const delayBeforePreloaderOff = 1200;
export const preloaderTowersAnimationDuration = 150;
export const totalAnimationPreloaderTowerDuration =
  preloaderTowersAnimationDuration * numberOfPreloaderTowerStates;

export const minNameLength = 3,
  maxCityNameLength = 12,
  maxUserNameLength = 14;

export enum ResponseStatuses {
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export const symbolRegExp = new RegExp(
  /[-!$%^&*()_+|~=`{}\[\]:";'<>?,@#.\/\\]/g
);
