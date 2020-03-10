import { apiRoutes } from '..';
import { put } from '../requests';

export const updateUserData = async <T>(data: T) => {
  await put<undefined, T>(apiRoutes.UPDATE_DATA, data);
};
