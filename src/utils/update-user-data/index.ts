import { editUserData, IEditUserData } from '../../effector/user-data/events';
import { saveUserData } from '../../api/save-user-data';
import { birthdayParser } from '../birthday-parser';

const checkBirthdayDate = (date: string | number) => {
  if (!+date) return null;
  return date;
};

export const updateUserData = (data: IEditUserData) => {
  editUserData({
    name: data.name,
    birthday: data.birthday,
  });
  if (data.birthday && data.birthday.dd && data.birthday.mm) {
    const parsedBirthdayDd = birthdayParser(data.birthday.dd);
    const parsedBirthdayMm = birthdayParser(data.birthday.mm);
    if (
      !checkBirthdayDate(parsedBirthdayDd) ||
      !checkBirthdayDate(parsedBirthdayMm)
    ) {
      saveUserData({ name: data.name });
    } else {
      saveUserData({
        name: data.name,
        birthday: `${birthdayParser(data.birthday.dd)}.${birthdayParser(
          data.birthday.mm
        )}`,
      });
    }
  }
};
