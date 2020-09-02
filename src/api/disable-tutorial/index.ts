import { post } from '../requests';
import { apiRoutes } from '..';

export const disableTutorialRequest = async () => {
  const response = await post(apiRoutes.CLOSE_TUTORIAL);
  return response.data;
};
