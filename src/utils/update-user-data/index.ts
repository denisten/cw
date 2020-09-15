import { editUserData } from '../../effector/user-data/events';
import { saveUserData } from '../../api/save-user-data';

export const updateUserData = async (name: string) => {
  editUserData({
    name,
  });
  await saveUserData({ name });
};
