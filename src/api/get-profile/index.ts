import { get } from '../requests';
import { apiRoutes } from '..';

export const getProfile = async () => {
  const response = await get<{ data: IGetProfile }>(apiRoutes.GET_PROFILE);
  return response.data;
};

export interface IGetProfile {
  name: string;
  worldName: string;
  assistantName: string;
}
