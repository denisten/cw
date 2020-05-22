import { apiRoutes } from '..';
import { IEditUserData } from '../../effector/user-data/events';
import { patch } from '../requests/patch';

export const saveUserData = async (data: ISaveUserData) => {
  await patch<{ data: ISaveUserData }, ISaveUserData>(
    apiRoutes.USER_DATA,
    data
  );
};

interface ISaveUserData extends Omit<IEditUserData, 'birthday'> {
  birthday?: string;
}
