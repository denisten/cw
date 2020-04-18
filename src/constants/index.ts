const daysNumInOneMonth = 31;

export const DaysNumArr: string[] = new Array(daysNumInOneMonth)
  .fill(0)
  .map((el, id) => (el = String(id + 1)));

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
