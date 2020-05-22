import { editUserData, IEditUserData } from '../../effector/user-data/events';
import { saveUserData } from '../../api/save-user-data';
import { birthdayParser } from '../birthday-parser';

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
