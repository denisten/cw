import { apiRoutes } from '..';
import { IEditUserData } from '../../effector/user-data/events';
import { patch } from '../requests/patch';

export const saveUserData = async (data: ISaveUserData) => {
  return await patch<{ data: ISaveUserData }, ISaveUserData>(
    apiRoutes.SAVE_USER_DATA,
    data
  );
};

interface ISaveUserData extends IEditUserData {
  musicValue?: number;
  soundValue?: number;
  showSlider?: boolean;
}
