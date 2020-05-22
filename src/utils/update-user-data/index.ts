import { editUserData, IEditUserData } from '../../effector/user-data/events';
import { saveUserData } from '../../api/save-user-data';
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

export const updateUserData = (data: IEditUserData) => {
  editUserData({
    name: data.name,
    birthday: data.birthday,
  });
  if (data.birthday && data.birthday.dd && data.birthday.mm) {
    saveUserData({
      name: data.name,
      birthday: `${birthdayParser(data.birthday.dd)}.${birthdayParser(
        data.birthday.mm
      )}`,
    });
  }
};
