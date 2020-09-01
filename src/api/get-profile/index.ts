import { get } from '../requests';
import { apiRoutes } from '..';

export const getProfile = async () => {
  const response = await get<{ data: IGetProfile }>(apiRoutes.USER_DATA);
  return response.data.data;
};

export interface IGetProfile {
  assistantName: string | null;
  avatar: string;
  birthday: string;
  id: number;
  name: string | null;
  worldName: string;
  msisdn: string;
  guid: string;
  freshProgressTimeout: number;
  musicValue: number;
  soundValue: number;
}
