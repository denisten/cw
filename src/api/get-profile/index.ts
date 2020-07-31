import { get } from '../requests';
import { apiRoutes } from '..';
import { scoreSuccessRequests } from '../../effector/preloader/events';

export const getProfile = async () => {
  const response = await get<{ data: IGetProfile }>(apiRoutes.USER_DATA);
  scoreSuccessRequests();
  return response.data.data;
};

export interface IGetProfile {
  assistantName: string | null;
  avatar: string;
  birthday: string;
  id: number;
  name: string | null;
  worldName: string;
}
