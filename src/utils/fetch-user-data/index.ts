import { getProfile } from '../../api/get-profile';
import { saveUserDataFromBackend } from '../../effector/user-data/events';

export const fetchUserData = async () => {
  const userData = await getProfile();
  saveUserDataFromBackend(userData);
};
