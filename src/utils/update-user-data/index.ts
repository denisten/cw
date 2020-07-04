import { editUserData, IEditUserData } from '../../effector/user-data/events';
import { saveUserData } from '../../api/save-user-data';
import { birthdayParser } from '../birthday-parser';
import { coughtError } from '../../effector/error-boundary-store/events';

const checkBirthdayDate = (date: string | number) => {
  if (!+date) return null;
  return date;
};

export const updateUserData = async (data: IEditUserData) => {
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
      await saveUserData({ name: data.name });
    } else {
      await saveUserData({
        name: data.name,
        birthday: `${birthdayParser(data.birthday.dd)}.${birthdayParser(
          data.birthday.mm
        )}`,
      });
    }
  }
  coughtError({
    text: 'Данные пользователя успешно сохранены',
  });
};
