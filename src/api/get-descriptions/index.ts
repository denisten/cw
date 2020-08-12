import { get } from '../requests';

import { apiRoutes } from '..';
import { TowersTypes } from '../../effector/towers-progress/store';

export const getDescriptions = async () => {
  const response = await get<{ data: IGetDescriptions[] }>(
    apiRoutes.GET_DESCRIPTIONS
  );
  return response.data.data;
};

export interface IGetDescriptions {
  id: number;
  name: string;
  slug: TowersTypes;
  title: string;
  description: string;
}
