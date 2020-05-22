import { MonthsStringArr } from '../../constants';

export const birthdayParser = (date: string) => {
  return +date || String(MonthsStringArr.findIndex(el => el === date) + 1);
};

export const birthdayParserToJSON = (date: string) => {
  const birthdayDate = date.split('.');
  return {
    dd: birthdayDate[0],
    mm: birthdayDate[1],
  };
};
