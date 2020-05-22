import { get } from '../requests';
import { apiRoutes } from '..';

export const getProfile = async () => {
  const response = await get<{ data: IGetProfile }>(apiRoutes.USER_DATA);
  return response.data.data;
};

export interface IGetProfile {
  assistantName: string;
  avatar: string;
  birthday: string;
  id: number;
  name: string;
  worldName: string;
}
